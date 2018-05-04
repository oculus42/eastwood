const cmd = require('node-cmd');
const rcFile = require('./rcfile');

const formatAirbnb = require('../formats/airbnb');
const formatAirbnbBase = require('../formats/airbnb-base');
const formatGoogle = require('../formats/google');
const formatStandardEslint = require('../formats/standard-eslint');

const installPackages = (packageList = []) => new Promise((resolve, reject) => {
  cmd.get(`npm install --save-dev ${packageList.join(' ')}`, (err, data, stderr) => {
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

const configs = {
  airbnb() {
    return installPackages(formatAirbnb.packages)
      .then(rcFile.chainEdit('.eslintrc', formatAirbnb.eslintrc))
      .then(rcFile.chainEdit('.editorconfig', formatAirbnb.editorconfig));
  },
  'airbnb-base': () => installPackages(formatAirbnbBase.packages)
    .then(rcFile.chainEdit('.eslintrc', formatAirbnbBase.eslintrc))
    .then(rcFile.chainEdit('.editorconfig', formatAirbnbBase.editorconfig)),
  google() {
    return installPackages(formatGoogle.packages)
      .then(rcFile.chainEdit('.eslintrc', formatGoogle.eslintrc));
  },
  standard() {
    return installPackages(['standard']);
  },
  'standard-eslint': () => installPackages(formatStandardEslint.packages)
    .then(rcFile.chainEdit('.eslintrc', formatStandardEslint.eslintrc)),
};

module.exports = configs;
