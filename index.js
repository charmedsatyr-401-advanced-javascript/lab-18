'use strict';

const alterFile = require('./app/app.js');

const file = process.argv.slice(2).shift();
alterFile(file);
