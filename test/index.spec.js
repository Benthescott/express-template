'use strict';

const GREETING = 'Hello World!';

describe('Basic Test', () => {

    test('says hello', () => {
        expect(GREETING).toStrictEqual('Hello World!');
    });
});