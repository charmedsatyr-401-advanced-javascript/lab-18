'use strict';

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(PORT);
io.on('connection', handleConnection);

/**
 * Handle events received by the server
 * by delegating tasks to component listeners
 * @function
 * @name handleConnection
 * @param socket {object} A Socket.io object
 **/
function handleConnection(socket) {
  console.log(`Welcome, ${socket.id}`);

  socket.on('file-save', payload => socket.broadcast.emit('file-save', payload));
  socket.on('file-error', payload => socket.broadcast.emit('file-error', payload));

  socket.on('error', err => console.log(`Server error, ${err.message}`));
  socket.on('disconnect', () => console.log(`Goodbye, ${socket.id}`));
}
