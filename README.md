![CF](http://i.imgur.com/7v5ASc8.png) LAB
=================================================

## Lab 18: Socket.io

### Author: Joseph Wolfe

### Links and Resources
* [repo](https://github.com/charmedsatyr-401-advanced-javascript/lab-18)
* [![Build Status](https://travis-ci.org/charmedsatyr-401-advanced-javascript/lab-18.svg?branch=submission)](https://travis-ci.org/charmedsatyr-401-advanced-javascript/lab-18)

#### Documentation
* [jsdoc](./docs/)

### Modules
`./app.js`

`./logger.js`

`./server.js`

`./lib/read.js`

`./lib/uppercase.js`

`./lib/write.js`

-----

#### `.src/app.js`
##### Exported Values and Methods
This is the entry point of the application that accepts the application's command line arguments. On start, it connects to the TCP client, firing `handleConnect`, and executes `alterFile`. It invokes `handleClose` when its connection to the server is closed.

* `alterFile(file)` -> `undefined`
* This function takes a filepath and uses the helper functions `read`, `uppercase`, and `write` to capitalize the letters in the file. It emits an object for the TCP server and closes the app's connection to the server after a successful `save` or `error`.

* `handleConnect()` -> logs to the console
* `handleClose()` -> logs to the console

-----

#### `./src/logger.js`
##### Exported Values and Methods
This module provides event listeners and handling functions that log to the console.
* `handleConnect()` -> logs to the console
* `handleClose()` -> logs to the console
* `handleData(buffer)` -> logs to the console, or `undefined`

`handleData` parses a received buffer to JSON (after a validation step) and logs an appropriate message based on an expected object's data. This function expects a parsed JSON argument to have the format:

`event`: `save` or `error`
`payload`: file name
`message`: `String`

-----

#### `./src/logger.js`
##### Exported Values and Methods
This module creates a server connection and logs when clients connect or disconnect. It assigns a random `id` to each connected client in the socket pool.

If the server receives data, it invokes the `dispatchEvent` function with the received buffer.

* `dispatchEvent(buffer)` -> logs or a TCP broadcast
The `dispatchEvent` function parses the received buffer and evaluates it for an `event` key with the value `save` or `error`. It logs any such objects and broadcasts them to the pool of connected clients. If the input cannot be validated, the function logs it.

-----

#### `./lib/read.js`
##### Exported Values and Methods
This module reads a file and returns a Promise. It emits events as appropriate.
* `read(file)` -> `Promise` -> `buffer`

-----

#### `./lib/uppercase.js`
##### Exported Values and Methods
* `uppercase(data)` -> modified `data`
This module takes a readable buffer or other input, converts it to a string, and capitalizes its letters. It emits events as appropriate.

-----

#### `./lib/write.js`
##### Exported Values and Methods
* `write(file, text)` -> `Promise` -> side effect
This module reads a file and returns a Promise. It writes a `file` with the given `text` as a side effect. It emits events as appropriate.

-----

### Setup
#### `.env` 
* N/A

#### Running the app
* Run the following commands in order on separate command line instances:
  * `node server.js`
  * `node logger.js`
  * `node app.js <fileName>`, where `<fileName>` is the path to a readable file. 

#### Tests
* How do you run tests?
  * `npm run test`
  * `npm run test-watch`
  * `npm run lint`

* What assertions were made?
  * `app.test.js`
    * `handleConnect` function

      ✓ should log to the console once (18ms)
    * `handleClose` function

      ✓ should log to the console once (1ms)
  * `logger.test.js`
    * `handleData` function

      ✓ should do nothing if its argument has the wrong format

      ✓ should log event, payload, and message values if they exist for a `save` event

      ✓ should log event, payload, and message values if they exist for an `error` event 
    * `handleConnect` function

      ✓ should log to the console once
    * `handleClose` function

      ✓ should log to the console once
    * `handleClose` function

      ✓ should log to the console once
  * `read.test.js`
    * `read` function

      ✓ resolves when given a good file

      ✓ throws an error when given a bad file

  * `uppercase.test.js`
    * `uppercase` function

      ✓ should transform its argument text to uppercase

      ✓ should accept and return a buffer
  * `write.test.js`
    * `write` function

      ✓ resolves when given a good file

      ✓ rejects when given a bad file

      ✓ rejects when given bad data

* What assertions need to be / should be made?
Connection error handlers need testing.

Some tests inadvertently trigger a TCP connection that results in an error if the server is offline.

It has not been determined which tests are responsible.

Additional integration testing might be done among the three main components of the project.

#### UML
[uml diagram](./docs/assets/uml.jpg)
