import { producer } from '../config/kafka';

export async function sendEvent(topic: string, message: object) {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
    });
}