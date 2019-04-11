'use strict';

const { handleSave, handleError } = require('../../logger/logger.js');

const log = jest.spyOn(global.console, 'log').mockImplementation(() => {});
const error = jest.spyOn(global.console, 'error').mockImplementation(() => {});

describe('`handleSave` function', () => {
  it('should log to the console once', () => {
    handleSave();
    expect(log).toHaveBeenCalledTimes(1);
    log.mockReset();
  });
});

describe('`handleError` function', () => {
  it('should error log to the console once', () => {
    handleError();
    expect(error).toHaveBeenCalledTimes(1);
    error.mockReset();
  });
});
