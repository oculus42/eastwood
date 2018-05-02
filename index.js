#! /usr/bin/env node
// Based on https://gist.github.com/oculus42/99092766633ca2451e9d6e2217a94a80

const cmd = require('node-cmd');

const defaultArgs = ['airbnb'];

const installPackages = (packageList = []) => {
    return new Promise((resolve, reject) => {
        cmd.get(`npm install ${packageList.join(' ')}`, (err, data, stderr) => {
            if (err) {
                reject(err);
                return;
            }

            resolve({
                data,
                stderr,
            });
        });
    });
};

const methods = {
    airbnb: function () {
        const packages = [
            'eslint',
            'eslint-plugin-import',
            'eslint-plugin-react',
            'eslint-plugin-jsx-a11y',
            'eslint-config-airbnb',
        ];

        return installPackages(packages);
    },
    'airbnb-base': function () {
        const packages = [
            'eslint',
            'eslint-plugin-import',
            'eslint-config-airbnb-base',
        ];

        return installPackages(packages);
    },
};

module.exports = methods;
