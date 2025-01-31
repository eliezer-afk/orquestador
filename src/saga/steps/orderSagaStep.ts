import axios from 'axios';

const PURCHASE_SERVICE_URL = 'http://localhost:3000/purchase';

export const orderSagaStep = {
    execute: async () => {
        console.log('Ejecutando paso: Crear pedido');
        try {
            const response = await axios.post(`${PURCHASE_SERVICE_URL}/create`, {
                userId: '12345',
                productId: '67890',
                quantity: 1,
                address: '123 Main St, Anytown, USA',
                paymentMethod: 'credit_card',
                paymentDetails: {
                    cardNumber: '4111111111111111',
                    expirationDate: '12/23',
                    cvv: '123'
                }
            });
            console.log('Pedido creado:', response.data);
        } catch (error) {
            console.error('Error al crear el pedido:', error);
            throw error;
        }
    },
    compensate: async () => {
        console.log('Compensando paso: Eliminar pedido');
        try {
            const response = await axios.post(`${PURCHASE_SERVICE_URL}/cancel`, {
                orderId: '12345',
                userId: '12345',
                reason: 'User requested cancellation'
            });
            console.log('Pedido cancelado:', response.data);
        } catch (error) {
            console.error('Error al cancelar el pedido:', error);
            throw error;
        }
    },
};