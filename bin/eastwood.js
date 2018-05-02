#!/usr/bin/env node
// Based on https://gist.github.com/oculus42/99092766633ca2451e9d6e2217a94a80

const methods = require('../index');

const defaultArgs = ['airbnb'];

// Write your NodeJS scripts to run from the command line or be required.
if (!module.parent) {
    // Directly invoked.

    // Slice out the script from the args
    const origArgs = process.argv.slice(process.argv[0].endsWith('node') ? 2 : 1);

    // Optional default logic if no arguments were provided
    const myArgs = origArgs.length < 3 ? defaultArgs : origArgs;
    const method = myArgs[0];

    // Check if the argument is one of our named methods
    if (methods[method]) {
        // Args arrive as strings, so this might need more work.
        // Arrays and Objects are probably not convenient.

        console.log(`Installing ${method}`);

        // Execute our method with the rest of the command-line arguments
        methods[method].apply(null, myArgs.slice(1))
            .then(({data}) => console.log(data), err => console.error(err));
    } else {
        // You could put a default here if you don't want it to use the methods above
        console.log('The method you requested was not found.');
    }
} else {
    // Required by another file
    module.exports = methods;
}
