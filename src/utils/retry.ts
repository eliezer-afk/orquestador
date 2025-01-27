import redis from "../config/redis";

async function retry(key: string, maxAttempts: number, fn: () => Promise<any>) {
    const attempts = parseInt((await redis.get(key)) || "0", 10);

    if (attempts >= maxAttempts) {
        console.log(`Se alcanzó el límite máximo de reintentos (${maxAttempts})`);
        return;
    }

    try {
        return await fn();
    } catch (error) {
        await redis.set(key, attempts + 1, "EX", 3600); // Incrementar intentos
        console.log(`Error, reintentando (${attempts + 1}/${maxAttempts})`);
        throw error;
    }
}

// Ejemplo de uso
retry("task:123", 3, async () => {
    console.log("Ejecutando tarea...");
    throw new Error("Fallo en la tarea"); // Simula un error
});
