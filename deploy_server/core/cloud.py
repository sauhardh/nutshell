import boto3
import os


class CloudStorage:
    def __init__(self):
        session = boto3.Session(
            aws_access_key_id=os.getenv("CLOUD_ACCESS_KEY_ID"),
            aws_secret_access_key=os.getenv("CLOUD_SECRET_ACCESS_KEY"),
        )

        # s3 instance
        self.s3 = session.client(
            "s3",
            endpoint_url=os.getenv("CLOUD_STORAGE_ENDPOINT"),
            region_name="auto",
        )

    def download_objects(
        self, bucket_name: str, prefix: str = "repos/", local_path: str = "./downloads/"
    ):
        self.s3.download_file(bucket_name, prefix, local_path)
