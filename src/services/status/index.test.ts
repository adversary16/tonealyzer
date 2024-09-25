import { expect, test } from 'vitest'
import { statusService } from ".";

test('valid_measurement_format', async () => {
    await new Promise((resolve)=> {
        console.log('waiting for a second for stats to accumulate');
        setTimeout(() => {
            resolve(undefined)
        }, 1000)
    })
    expect(Math.abs(statusService.cpu)).toBeGreaterThanOrEqual(0);
    expect(Math.abs(statusService.cpu)).toBeLessThanOrEqual(100);
    expect(statusService.ram).toBeGreaterThan(0);
})

test('valid status syntax', async () => {
    const fields = ['cpu', 'ram' ];
    const statusDtoKeys = Object.keys(statusService.status);
    fields.forEach((f) => {
        expect(statusDtoKeys).toContain(f)
    })
})