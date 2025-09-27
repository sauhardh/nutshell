from flask import Flask
from dotenv import load_dotenv

from core.redis import NutshellRedis
from core.cloud import CloudStorage

load_dotenv(dotenv_path="../.env")

app = Flask(__name__)

if __name__ == "__main__":
    CloudStorage()
    redis_client = NutshellRedis("localhost", 6379, 0)

    current_job = redis_client.get_current_job("jobQueue")
    print(current_job)
