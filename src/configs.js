const cmd = require('node-cmd');
const rcFile = require('./rcfile');

const formatAirbnb = require('../formats/airbnb');
const formatAirbnbBase = require('../formats/airbnb-base');
const formatGoogle = require('../formats/google');
const formatReactApp = require('../formats/react-app');
const formatStandard = require('../formats/standard');
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

/**
 * Get the .eslintrc string, whether direct or from JSON object
 * @param {object} config
 * @return {string}
 */
const getLintString = config => (typeof config.eslintrc === 'string' ?
  config.eslintrc :
  JSON.stringify(config.eslintrc, null, 2));

/**
 * Produce function for generating the .eslintrc file
 * @param {object} config
 * @return {function}
 */
const makeLintHandler = (config) => {
  // No eslintrc entry? We're done here.
  if (!config.eslintrc) {
    return (log = { data: '' }) => ({ data: `${log.data}\nNo .eslintrc to write` });
  }

  // Handle Object vs string
  return rcFile.chainEdit('.eslintrc', getLintString(config));
};

/**
 * Produce function for generating the .editorconfig file
 * @param {object} config
 * @return {function}
 */
const makeEditorConfigHandler = (config) => {
  // No editorconfig entry? We're done here.
  if (!config.editorconfig) {
    return (log = { data: '' }) => ({ data: `${log.data}\nNo .editorconfig to write` });
  }

  // Handle Object vs string
  return rcFile.chainEdit('.editorconfig', config.editorconfig);
};

/**
 *
 * @param {object} config
 * @return {Promise}
 */
const runConfig = config => installPackages(config.packages)
  .then(makeLintHandler(config))
  .then(makeEditorConfigHandler(config));

const configs = {
  airbnb() {
    return runConfig(formatAirbnb);
  },
  'airbnb-base': () => runConfig(formatAirbnbBase),
  google() {
    return runConfig(formatGoogle);
  },
  'react-app': () => runConfig(formatReactApp),
  standard() {
    return runConfig(formatStandard);
  },
  'standard-eslint': () => runConfig(formatStandardEslint),
};

module.exports = configs;
