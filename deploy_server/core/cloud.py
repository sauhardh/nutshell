import boto3
import os
from pathlib import Path


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
        self,
        bucket_name: str,
        prefix: str = "repos/",
        local_path: str = Path.cwd().joinpath("downloads"),
    ):
        local_path: Path = Path(local_path).mkdir(parents=True, exist_ok=True)

        paginator = self.s3.get_paginator("list_objects_v2").paginate(
            Bucket=bucket_name, Prefix=prefix
        )

        for page in paginator:
            for obj in page.get("Contents", []):
                key = obj.get("Key", "")
                rel_path = key[len(prefix) :]
                target: Path = local_path / rel_path

                target.parent.mkdir(parents=True, exist_ok=True)

                self.s3.download_file(bucket_name, key, str(target))
