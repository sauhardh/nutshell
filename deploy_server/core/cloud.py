import boto3
import os
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor


class CloudStorage:
    _max_workers = 5
    _working_dir: str | None = None

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
        prefix: str,
        local_path: str | Path = Path.cwd() / "downloads",
    ):
        local_path: Path = Path(local_path)
        local_path.mkdir(parents=True, exist_ok=True)

        self._working_dir = local_path / prefix

        paginator = self.s3.get_paginator("list_objects_v2").paginate(
            Bucket=bucket_name, Prefix=prefix
        )

        download_jobs = []
        for page in paginator:
            for obj in page.get("Contents", []):
                key = obj.get("Key", "")
                target: Path = local_path / key
                target.parent.mkdir(parents=True, exist_ok=True)
                download_jobs.append((key, target))

        def _download_task(key_target: tuple) -> str:
            key, target = key_target
            self.s3.download_file(bucket_name, key, str(target))
            return key

        with ThreadPoolExecutor(max_workers=self._max_workers) as executor:
            for key in executor.map(_download_task, download_jobs):
                print(f"Downloaded: {key}")

        return self

    def get_working_dir(self) -> str | None:
        if self._working_dir is None:
            print(
                "NO WORKING DIR IS INITIALIZED. please call this function after download_objects()"
            )
        return self._working_dir
