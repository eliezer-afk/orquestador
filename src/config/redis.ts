import Redis from "ioredis";

const redis = new Redis({
    host: process.env.REDIS_HOST || "localhost", // Dirección del servidor Redis
    port: parseInt(process.env.REDIS_PORT || "6379", 10), // Puerto de Redis
    password: process.env.REDIS_PASSWORD || undefined,   // Contraseña, si aplica
    retryStrategy: (times) => {
        // Estrategia de reintento: aumenta el tiempo de espera con cada intento fallido
        const delay = Math.min(times * 50, 2000);
        console.log(`Retrying Redis connection in ${delay}ms...`);
        return delay;
    },
});

redis.on("connect", () => {
    console.log("Connected to Redis!");
});

redis.on("error", (err) => {
    console.error("Redis connection error:", err);
});

export default redis;