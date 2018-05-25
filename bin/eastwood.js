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

  const noFlags = origArgs.filter(arg => arg.indexOf('--') !== 0);
  const myArgs = !noFlags.length ? defaultArgs : noFlags;
  const configName = myArgs[0];

  // This should be fleshed out better, but we only have one option to test right now.
  const justHere = origArgs.includes('--here');

  run({
    configName,
    justHere,
  });
} else {
  // Required by another file
  module.exports = run;
}
