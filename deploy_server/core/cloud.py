import boto3
import os
from pathlib import Path
import logging
from typing import Self
from concurrent.futures import ThreadPoolExecutor
from botocore.exceptions import BotoCoreError, ClientError


logger = logging.getLogger(__name__)


class CloudStorage:
    _max_workers = 1
    _working_dir: str | None = None

    def __init__(self) -> None:
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
    ) -> Self:
        try:
            local_path: Path = Path(local_path)
            local_path.mkdir(parents=True, exist_ok=True)

            logger.info(f"cloud download objects, local_path {local_path}")
        except OSError as e:
            logger.error(f"Path creation failed on download_objects: {e}")
            raise

        self._working_dir = local_path / prefix
        logger.info(f"cloud working dir {self._working_dir}")

        try:
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

            logger.info(f"cloud download jobs, local_path {download_jobs}")

            def _download_task(key_target: tuple) -> str:
                key, target = key_target
                if target.exists():
                    logger.info(f"{target} already exist. Skipping")
                    return key
                self.s3.download_file(bucket_name, key, str(target))
                return key

            with ThreadPoolExecutor(max_workers=self._max_workers) as executor:
                for key in executor.map(_download_task, download_jobs):
                    logger.info(f"Downloaded: {key}")

        except (self.s3.exceptions.NoSuchBucket, BotoCoreError, ClientError) as e:
            logger.error(f"Cloud Error occured while downloading objects {e}")
        except Exception as err:
            logger.error(f"Error occured while downloading objects {err}")
        return self

    def get_working_dir(self) -> str | None:
        if self._working_dir is None:
            logger.info(
                "NO WORKING DIR IS INITIALIZED. Note: Make sure you are calling this function after `download_objects()`"
            )
        return self._working_dir

    def upload_dir(
        self, bucket_name: str, local_path: str | Path, base_dir: str | Path
    ):
        object_name = str(local_path.relative_to(base_dir))
        try:
            logger.info(
                f"Trying to upload {local_path} in {bucket_name}, to {object_name}"
            )
            self.s3.upload_file(str(local_path), bucket_name, object_name)
            return True
        except ClientError as e:
            logger.error(f"Error occured while uploading to bucket {e}")
            return False

    def ensure_bucket(self, bucket_name) -> bool:
        try:
            self.s3.head_bucket(Bucket=bucket_name)
            return True

        except ClientError as e:
            error_code = int(e.response["Error"]["Code"])
            logger.warning(f"Bucket {bucket_name} is not present. Creating..")

            if error_code in [404, 400]:
                # Bucket creation happens here
                logger.info("Creating bucket....")
                self.s3.create_bucket(Bucket=bucket_name)
                logger.info(f"Bucket created {bucket_name}")
            else:
                return False
