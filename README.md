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
`./index.js`

`./app/app.js`

`./logger/logger.js`

`./server/server.js`

`./lib/read.js`

`./lib/uppercase.js`

`./lib/write.js`

-----
#### `./index.js`
This is the entry point of the application that accepts the application's command line arguments for the `alterFile` function.

#### `./app/app.js`
##### Exported Values and Methods
* `alterFile(file)` -> `undefined`
* This function takes a filepath and uses the helper functions `read`, `uppercase`, and `write` to capitalize the letters in the file. It emits `file-save` or `file-error` messages to the Socket.io server depending upon the results of its operation and disconnects from the server thereafter.

-----

#### `./logger/logger.js`
##### Exported Values and Methods
This module provides Socket.io event listeners and handling functions that log to the console.
* `handleSave(payload)` -> logs to the console when the server emits a `file-save` message.
* `handleError(payload)` -> logs to the console when the server emits a `file-error` message.

-----

#### `./lib/read.js`
##### Exported Values and Methods
This module reads a file and returns a Promise that contains a file buffer.
* `read(file)` -> `Promise` -> `buffer`

-----

#### `./lib/uppercase.js`
##### Exported Values and Methods
* `uppercase(data)` -> modified `data`
This module takes a readable buffer or other input, converts it to a string, and capitalizes its letters. It returns a file buffer.

-----

#### `./lib/write.js`
##### Exported Values and Methods
* `write(file, text)` -> `Promise` -> side effect
This module reads a file and returns a Promise. It writes a `file` with the given `text` as a side effect.
-----

### Setup
#### `.env`
* HOST (if not provided, the value `127.0.0.1` will be used)
* PORT (if not provided, the value `3000` will be used)

#### Running the app
* Run the following commands in order on separate command line instances:
  * `node ./server/server.js` - to start the Socket.io server
  * `node ./logger/logger.js` - to start the Socket.io client logger
  * `node index.js <fileName>` - to run the appln `<fileName>`, where `<fileName>` is the path to a readable file. 

#### Tests
* How do you run tests?
  * `npm run test`
  * `npm run test-watch`
  * `npm run lint`

* What assertions were made?
  * `./app/app.js`
    * `alterFile` function
      ✓ should not throw an error

  * `./logger/logger.js`
    * `handleSave` function
      ✓ should log to the console once (1ms)
    * `handleError` function
      ✓ should error log to the console once

  * `./lib/read.js`
    * `read` function
      ✓ resolves when given a good file (2ms)
      ✓ throws an error when given a bad file (1ms)

  * `./lib/uppercase.js`
    * `uppercase` function
      ✓ should transform its argument text to uppercase (1ms)
      ✓ should accept and return a buffer (1ms)

  * `./lib/write.js`
    * `write` function
      ✓ resolves when given a good file (1ms)
      ✓ rejects when given a bad file (1ms)
      ✓ rejects when given bad data

* What assertions need to be / should be made?
Additional integration testing between `alterFile` and the Socket.io library might be performed.

#### UML
[uml diagram](./docs/assets/uml.jpg)
