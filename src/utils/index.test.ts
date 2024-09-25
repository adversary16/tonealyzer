import { expect, test } from 'vitest'

import { Util } from '.';
test('date', () => {
    const FREDDIE_MERCURY_BIRTHDAY = '1956-09-05';
    const YURY_GAGARIN_BIRTHDAY = '03.09.1934';
    expect(Util.formatDate(new Date(FREDDIE_MERCURY_BIRTHDAY))).toBe('1956_09_05')
    expect(Util.formatDate(new Date(YURY_GAGARIN_BIRTHDAY))).toBe('1934_03_09')  
})