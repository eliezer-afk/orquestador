import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'orchestrator',
    brokers: ['localhost:9092'], // Cambia esto según tu configuración de Kafka
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'orchestrator-group' });

export async function initKafka() {
    await producer.connect();
    await consumer.connect();
}
export default initKafka;