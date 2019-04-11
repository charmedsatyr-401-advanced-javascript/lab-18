'use strict';

const HOST = process.env.HOST || 'http://127.0.0.1';
const PORT = process.env.PORT || 3000;

const io = require('socket.io-client');
const socket = io.connect(`${HOST}:${PORT}`);

socket.on('file-save', handleSave);
socket.on('file-error', handleError);

/***
 * @function
 * @name handleSave
 * @param payload {string} A file path.
 */
function handleSave(payload) {
  console.log('File saved:', payload);
}

/***
 * @function
 * @name handleError
 * @param payload {string} A file path.
 */
function handleError(payload) {
  console.error('Error:', payload);
}

module.exports = { handleSave, handleError };
