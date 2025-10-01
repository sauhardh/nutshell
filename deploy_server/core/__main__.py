from flask import Flask
from dotenv import load_dotenv
import os
import logging
from pathlib import Path
import sys

from core.redis import NutshellRedis
from core.cloud import CloudStorage
from core.builder import Build
from core.utils import upload_to_bucket

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="[%(levelname)s] <%(name)s>: %(message)s",
)
logger = logging.getLogger(__name__)

load_dotenv(dotenv_path="../.env")
app = Flask(__name__)

if __name__ == "__main__":
    _BUCKET_NAME = os.getenv("BUCKET_NAME") or "nutshell"
    _PREFIX = os.getenv("CONVENTIONAL_PREFIX") or "repos"

    redis_client = NutshellRedis("localhost", 6379, 0)
    next_repo = redis_client.get_current_job("jobQueue")

    if not next_repo:
        next_repo = "jaDlMY"
        # continue

    # cloud = CloudStorage().download_objects(_BUCKET_NAME, f"{_PREFIX}/{next_repo}/")
    # working_dir = cloud.get_working_dir()

    working_dir = f"/home/sauhardha-kafle/Desktop/nutshell/deploy_server/downloads/{_PREFIX}/{next_repo}/"

    # builder = Build().build(app_path=working_dir)
    # build_path = builder.get_build_path()
    build_path = None
    if not build_path:
        logger.warning(
            "Failed to get build_path. build_path should be retrived from `Build` object."
        )
        build_path = f"/home/sauhardha-kafle/Desktop/nutshell/deploy_server/downloads/{_PREFIX}/{next_repo}/build"

    base_dir = Path(build_path).parent.parent

    cloud = CloudStorage()
    upload_to_bucket("nutshell-build", build_path, cloud, base_dir)
    print(next_repo)
