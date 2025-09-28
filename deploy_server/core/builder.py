import docker
from pathlib import Path


class Build:
    def __init__(self):
        self.client = docker.from_env()

    def build(self, app_path: Path | str):
        if isinstance(app_path, str):
            app_path = Path(app_path)
            build_path = app_path / "build"

        print("app_path", app_path, "build_path", build_path)

        if not Path.exists(app_path):
            # TODO: log: path does not exist
            raise FileNotFoundError(f"{app_path} does not exist")

        container = self.client.containers.run(
            image="node:20",
            command="bash -c 'npm install && npm run build'",
            volumes={str(app_path): {"bind": "/app", "mode": "rw"}},
            working_dir="/app",
            detach=True,
            tty=True,
        )

        # logs
        for line in container.logs(stream=True):
            print(line.decode("utf-8").strip())

        exit_code = container.wait()["StatusCode"]
        container.remove()

        if exit_code != 0:
            raise RuntimeError(
                f"React build faile inside container. Exit code: {exit_code}"
            )

        # upload build path
