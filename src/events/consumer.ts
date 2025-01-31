import { consumer } from '../config/kafka';
import CatalogService from '../services/catalogService';

export async function startConsumer() {
    await consumer.subscribe({ topic: 'order-created', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Evento recibido: ${message.value}`);

            try {
                if (message.value) {
                    const order = JSON.parse(message.value.toString());
                    await CatalogService.saveOrder(order);
                    console.log('Orden guardada en la base de datos');
                } else {
                    console.error('El valor del mensaje es nulo');
                }

            } catch (error) {
                console.error('Error procesando el mensaje:', error);
            }
        },
    });
}