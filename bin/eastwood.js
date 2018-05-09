#!/usr/bin/env node
/* eslint no-console:0 */
// Based on https://gist.github.com/oculus42/99092766633ca2451e9d6e2217a94a80

const run = require('../index');

const defaultArgs = ['airbnb'];

// Write your NodeJS scripts to run from the command line or be required.
if (!module.parent) {
  // Directly invoked.

  // Slice out the script from the args
  const origArgs = process.argv.slice(process.argv[0].endsWith('node') ? 2 : 1);

  const myArgs = !origArgs.length ? defaultArgs : origArgs;
  const configName = myArgs[0];

  run(configName);
} else {
  // Required by another file
  module.exports = run;
}
