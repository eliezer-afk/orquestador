import { consumer } from '../config/kafka';

export async function startConsumer() {
    await consumer.subscribe({ topic: 'order-created', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Evento recibido: ${message.value}`);
            // Lógica de negocio aquí
        },
    });
}