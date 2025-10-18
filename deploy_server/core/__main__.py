from dotenv import load_dotenv
import os
import logging
from pathlib import Path
import time
import json
import requests

from core.redis import NutshellRedis
from core.cloud import CloudStorage
from core.builder import Build
from core.utils import upload_to_bucket

logging.basicConfig(
    level=logging.INFO,
    format="[%(levelname)s] <%(name)s>: %(message)s",
)
logger = logging.getLogger(__name__)


def main(
    redis_client: NutshellRedis, cloud: CloudStorage, _BUCKET_NAME: str, _PREFIX: str
) -> bool:
    # get job id from redis. job id is a unique prefix in cloud bucket, where specific files from github repo are stored.
    data: str = redis_client.get_current_job("jobQueue")
    if not data:
        logger.info("No jobs found in Redis queue.")
        return False

    try:
        job = json.loads(data)
        userId = job.get("userId")
        postId = job.get("postId")
        domainId = job.get("domainId")
        retries = job.get("retries", 0)
    except json.JSONDecodeError as e:
        logger.warning(f"Failed to decode data in json format {e}")
        return False

    redis_client.publish(userId, "downloading code")

    logger.info("next_repo %s", domainId)
    if not domainId:
        logger.info("No new jobs. Did not get any another job to continue.")
        return False

    # download objects from bucket that starts with `domainId`
    try:
        cloud.download_objects(_BUCKET_NAME, f"{_PREFIX}/{domainId}/")
    except Exception as e:
        logger.warning(f"Error occured while downloading objects {e}")
        if retries < 1:
            redis_client.put_new_job(
                "jobQueue",
                values=json.dumps(
                    {
                        "userId": userId,
                        "postId": postId,
                        "domainId": domainId,
                        "retries": retries + 1,
                    }
                ),
            )
        return False
    redis_client.publish(userId, "download completed")

    working_dir = cloud.get_working_dir()  # local path to a dir
    if not working_dir or not any(Path(working_dir).iterdir()):
        logger.error(f"No files found in {working_dir}, cannot build")
        return False
    redis_client.publish(userId, "building...")

    # to compile those downloaded objects(code) inside Docker container.
    try:
        builder = Build().build(app_path=working_dir)
    except RuntimeError as e:
        logger.warning(f"Error occured while building objects {e}")
        if retries < 1:
            redis_client.put_new_job(
                "jobQueue",
                values=json.dumps(
                    {
                        "userId": userId,
                        "postId": postId,
                        "domainId": domainId,
                        "retries": retries + 1,
                    }
                ),
            )
        return False
    redis_client.publish(userId, "build completed")
    redis_client.publish(userId, "uploading...")

    # local path to a compiled code, inside downloaded code.
    build_path = builder.get_build_path()
    base_dir = Path(build_path).parent.parent

    upload_to_bucket("nutshell-build", build_path, cloud, base_dir)
    redis_client.publish(userId, "upload completed")

    try:
        r = requests.post(
            os.getenv("DEPLOY_COMPLETE", "http://localhost:3000/api/deployComplete"),
            json={"userId": userId, "postId": postId, "domainId": domainId},
            timeout=10,
        )
        r.raise_for_status()
        logger.info(f"Got response: {r.json()}")
    except requests.HTTPError as e:
        logger.warning(
            f"Error occured while sending completed. {e}",
        )
    redis_client.publish(userId, "success")


load_dotenv(dotenv_path="../.env")

if __name__ == "__main__":
    # connect to redis client
    redis_client = NutshellRedis("localhost", 6379, 0)
    # get bucket name and prefix(if present) from dotenv file
    _BUCKET_NAME = os.getenv("BUCKET_NAME") or "nutshell"
    _PREFIX = os.getenv("CONVENTIONAL_PREFIX") or "repos"

    cloud = CloudStorage()

    while True:
        if not main(redis_client, cloud, _BUCKET_NAME, _PREFIX):
            logger.info("No jobs in the queue. Resuming normal flow after some time")
            time.sleep(10)
