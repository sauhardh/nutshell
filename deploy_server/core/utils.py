from pathlib import Path
import logging
from core.cloud import CloudStorage
from botocore.exceptions import ClientError

logger = logging.getLogger(__name__)


def list_all_files(path_to_dir: str | Path) -> list[Path]:
    if isinstance(path_to_dir, str):
        path_to_dir = Path(path_to_dir)

    return [f for f in path_to_dir.rglob("*") if f.is_file()]


def upload_to_bucket(
    bucket_name: str,
    path_to_dir: str | Path,
    uploader: CloudStorage,
    base_dir: Path,
):
    try:
        uploader.ensure_bucket(bucket_name)
        all_path: list[Path] = list_all_files(path_to_dir)

        for path in all_path:
            if uploader.upload_dir(bucket_name, path, base_dir):
                logger.info(f"Uploaded -> {path}")
            else:
                logger.warning(f"Failed to upload -> {path}")
    except ClientError as e:
        logger.warning(
            f"(ClientError) Error occured while trying to upload into bucket: {e}"
        )
    except Exception as er:
        logger.warning(
            f"(Exception) Error occured while trying to upload into bucket: {er}"
        )


if __name__ == "__main__":
    path_to_dir = "/home/sauhardha-kafle/Desktop/nutshell/deploy_server/downloads/repos/jaDlMY/public"
    list_all_files(path_to_dir)
