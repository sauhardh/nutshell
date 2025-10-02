from dotenv import load_dotenv
import os
import logging
from pathlib import Path
import time

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
    next_repo = redis_client.get_current_job("jobQueue")
    redis_client.put_status("status", key=next_repo, value="downloading...")

    if not next_repo:
        logger.info("No new jobs. Did not get any another job to continue.")
        return False

    # download objects from bucket that starts with `next_repo`
    cloud.download_objects(_BUCKET_NAME, f"{_PREFIX}/{next_repo}/")
    working_dir = cloud.get_working_dir()  # local path to a dir

    redis_client.put_status("status", key=next_repo, value="download completed")

    # to compile those downloaded objects(code) inside Docker container.
    builder = Build().build(app_path=working_dir)
    # local path to a compiled code, inside downloaded code.
    build_path = builder.get_build_path()
    base_dir = Path(build_path).parent.parent

    upload_to_bucket("nutshell-build", build_path, cloud, base_dir)
    redis_client.put_status("status", key=next_repo, value="Build completed")


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
