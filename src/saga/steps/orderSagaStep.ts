export const orderSagaStep = {
    execute: async () => {
        console.log('Ejecutando paso: Crear pedido');
        // Llama al microservicio de compras
    },
    compensate: async () => {
        console.log('Compensando paso: Eliminar pedido');
        // Llama al microservicio de compras para cancelar el pedido
    },
};