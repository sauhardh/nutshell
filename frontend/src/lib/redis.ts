import { createClient } from "redis";

const globalForRedis = global as unknown as {
    redis: ReturnType<typeof createClient> | undefined;
}

const redis = globalForRedis.redis ?? createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
});

redis.on("error", err => console.warn("redis failed to connect with given address", err));

if (!redis.isOpen) {
    redis.connect().catch(console.error)
}

if (process.env.NODE_ENV !== "production") {
    globalForRedis.redis = redis
}

export default redis;