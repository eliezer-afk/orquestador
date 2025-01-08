import CircuitBreaker from 'opossum';

export function createCircuitBreaker(action: () => Promise<any>, fallback: any) {
    const breaker = new CircuitBreaker(action, {
        timeout: 3000,
        errorThresholdPercentage: 50,
        resetTimeout: 5000,
    });

    breaker.fallback(fallback);

    return breaker;
}