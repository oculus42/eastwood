#!/usr/bin/env node
// Based on https://gist.github.com/oculus42/99092766633ca2451e9d6e2217a94a80

const getConfig = require('../src/getConfig');
const runConfig = require('../src/runConfig');

const defaultArgs = ['airbnb'];

// Write your NodeJS scripts to run from the command line or be required.
if (!module.parent) {
  // Directly invoked.

  // Slice out the script from the args
  const origArgs = process.argv.slice(process.argv[0].endsWith('node') ? 2 : 1);

  const myArgs = !origArgs.length ? defaultArgs : origArgs;
  const configName = myArgs[0];

  getConfig(configName)
    .then((config) => {
      console.log(`Installing ${configName}`);
      return config;
    })
    .then(runConfig)
    .then(({ data }) => console.log(data), err => console.error(err));

  // // Check if the argument is one of our named configs
  // if (configs[configName]) {
  //   // Args arrive as strings, so this might need more work.
  //   // Arrays and Objects are probably not convenient.
  //   console.log(`Installing ${configName}`);
  //
  //   // Execute our configName with the rest of the command-line arguments
  //   configs[configName].apply(null, myArgs.slice(1))
  //     .then(({ data }) => console.log(data), err => console.error(err));
  // } else {
  //   // You could put a default here if you don't want it to use the configs above
  //   console.log('The config you requested was not found.');
  // }
} else {
  // Required by another file
  module.exports = getConfig;
}
