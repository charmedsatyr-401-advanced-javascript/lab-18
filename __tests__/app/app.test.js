'use strict';

const alterFile = require('../../app/app.js');

jest.mock('fs');

describe('`alterFile` function', () => {
  it('should not throw an error', () => {
    const file = 'file.txt';
    expect(() => alterFile(file)).not.toThrow();
  });
});
