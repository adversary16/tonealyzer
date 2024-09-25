import { expect, test } from 'vitest'
import { aiService } from ".";

test('ai pipeline', () => {
    const SOMETHING_POSITIVE = 'kittens, puppies and beautiful motorcycles';
    const SOMETHING_NEGATIVE = 'hangover, homework and empty wallet';
    expect(aiService.analyze(SOMETHING_POSITIVE)).resolves.toBe('POSITIVE');
    expect(aiService.analyze(SOMETHING_NEGATIVE)).resolves.toBe('NEGATIVE');
    expect(async () => aiService.analyze()).rejects.toThrowError();
})