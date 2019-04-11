'use strict';

const HOST = process.env.HOST || 'http://127.0.0.1';
const PORT = process.env.PORT || 3000;

const io = require('socket.io-client');
const socket = io.connect(`${HOST}:${PORT}`);

// Import alterFile component functions
const read = require('../lib/read.js');
const uppercase = require('../lib/uppercase.js');
const write = require('../lib/write.js');

/**
 * This function reads a file and replaces its contents with
 * uppercased letters. It sends an object to the Socket.io server
 * on completion or error.
 * @function
 * @name alterFile
 * @param file {path} The path to a file on the filesystem
 */
const alterFile = file => {
  read(file)
    .then(uppercase)
    .then(buffer => write(file, buffer))
    .then(() => socket.emit('file-save', file) && socket.disconnect(true), 500)
    .catch(err => socket.emit('file-error', err.message) && socket.disconnect(true), 500);
};

module.exports = alterFile;
