'use strict';

const net = require('net');

const PORT = process.env.PORT || 3001;
const server = net.createServer();

server.listen(PORT, () => console.log(`Server up on ${PORT}`));
server.on('error', handleError);

let socketPool = {};

/**
 * Handle events received by the server
 * @function
 * @name dispatchEvent
 * @param buffer {buffer} A data buffer received by the server
 **/
const dispatchEvent = buffer => {
  const parsed = JSON.parse(buffer);
  const authorized = { save: true, error: true };
  const { event, payload, message } = parsed;
  const output = JSON.stringify({ event, payload, message });
  if (authorized[event]) {
    console.log(`BROADCAST: ${output}`);
    for (let socket in socketPool) {
      socketPool[socket].write(`${output}\n`);
    }
  } else {
    console.log(`IGNORE: ${output}\n`);
  }
};

// Connect the socket server, create a socket pool,
// and dispatch events to a handler. Handle disconnections.
server.on('connection', socket => {
  const id = `Socket-${Math.random()}`;
  console.log(`Welcome, ${id}`);
  socketPool[id] = socket;
  socket.on('data', buffer => dispatchEvent(buffer));
  socket.on('close', () => {
    console.log(`Goodbye, ${id}`);
    delete socketPool[id];
  });
});

/**
 * This function logs server connection errors.
 * @function
 * @name handleError
 * @param err {object} An error
 **/
function handleError(err) {
  console.error(`server error: ${err.message}`);
}
