import redis from "../config/redis";

async function circuitBreaker(key: string, failureThreshold: number) {
    const failures = parseInt((await redis.get(key)) || "0", 10);

    if (failures >= failureThreshold) {
        throw new Error("Circuito abierto: demasiados fallos");
    }

    try {
        // Lógica del servicio aquí
        console.log("Ejecutando operación...");
    } catch (error) {
        await redis.set(key, failures + 1, "EX", 3600); // Incrementar fallos
        throw error;
    }
}

// Ejemplo de uso
await circuitBreaker("service:inventory", 5);
