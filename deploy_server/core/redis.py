from redis import Redis


class NutshellRedis:
    r: Redis

    def __init__(self, host: str = "localhost", port: int = 6379, db=0):
        self.r = Redis(host, port, db, protocol=3)

    def get_current_job(self, key: str = "jobQueue") -> str:
        return self.r.lpop(key)
