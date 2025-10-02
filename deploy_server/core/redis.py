from redis import Redis


class NutshellRedis:
    r: Redis

    def __init__(self, host: str = "localhost", port: int = 6379, db=0):
        self.r = Redis(host, port, db, decode_responses=True)

    def get_current_job(self, key: str = "jobQueue") -> str | None:
        return self.r.rpop(key)

    def put_status(self, name: str, key: str, value: str = "processing"):
        if not key:
            key = "status"
        return self.r.hset(name, key, value)
