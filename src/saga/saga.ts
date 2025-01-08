interface SagaStep {
    execute: () => Promise<void>;
    compensate: () => Promise<void>;
}

export class Saga {
    private steps: SagaStep[] = [];

    addStep(step: SagaStep) {
        this.steps.push(step);
    }

    async execute() {
        try {
            for (const step of this.steps) {
                await step.execute();
            }
        } catch (error) {
            console.error('Error en Saga, ejecutando compensación');
            for (const step of this.steps.reverse()) {
                await step.compensate();
            }
        }
    }
}