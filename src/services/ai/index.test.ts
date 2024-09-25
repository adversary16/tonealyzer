import { expect, test } from 'vitest'
import { aiService } from ".";

test('ai pipeline', async() => {
    const SOMETHING_POSITIVE = 'kittens, puppies and beautiful motorcycles';
    const SOMETHING_NEGATIVE = 'hangover, homework and empty wallet';
    expect(await aiService.analyze(SOMETHING_POSITIVE)).toBe('POSITIVE');
    expect(await aiService.analyze(SOMETHING_NEGATIVE)).toBe('NEGATIVE');
})