import { initKafka } from './config/kafka';
import { Saga } from './saga/saga';
import { orderSagaStep } from './saga/steps/orderSagaStep';

async function main() {
    await initKafka();

    const saga = new Saga();
    saga.addStep(orderSagaStep);

    await saga.execute();
}

main().catch(console.error);