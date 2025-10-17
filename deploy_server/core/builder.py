import docker
from pathlib import Path
import logging

logger = logging.getLogger(__name__)


class Build:
    _build_path: Path | None = None

    def __init__(self):
        self.client = docker.from_env()

    def build(self, app_path: Path | str):
        if isinstance(app_path, str):
            app_path = Path(app_path)

        self._build_path = app_path / "build"

        if not app_path.exists():
            logger.info(f"Provided Path {app_path} does not exist")
            raise FileNotFoundError(f"{app_path} does not exist")

        container = self.client.containers.run(
            image="node:latest",
            command="bash -c 'chmod -R 777 /app && npm install && npm run build'",
            volumes={str(app_path): {"bind": "/app", "mode": "rw"}},
            working_dir="/app",
            detach=True,
            tty=True,
        )
        # logging
        buffer = ""
        for chunk in container.logs(stream=True):
            text = chunk.decode("utf-8")
            if "\n" in text:
                logger.info(buffer)
                buffer = ""
                continue
            buffer += text
        if buffer:
            logger.info(buffer.strip())
            buffer = ""

        exit_code = container.wait()["StatusCode"]
        container.remove()

        if exit_code != 0:
            raise RuntimeError(
                f"React build faile inside container. Exit code: {exit_code}"
            )
        return self

    def get_build_path(self) -> Path | None:
        return self._build_path
