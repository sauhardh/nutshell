from flask import Flask
from dotenv import load_dotenv
import os

from core.redis import NutshellRedis
from core.cloud import CloudStorage
from core.builder import Build

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

    builder = Build().build(app_path=working_dir)
    build_path = builder.get_build_path()

    if not build_path:
        #
        pass

    print(next_repo)
