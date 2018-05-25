const cmd = require('node-cmd');
const rcFile = require('./rcfile');

const passThrough = data => data;

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
 * @param {object} options
 * @return {function}
 */
const makeLintHandler = (options) => {
  // No eslintrc entry? We're done here.
  if (!options.config.eslintrc) {
    return log => Object.assign(log, { data: `${log.data}\nNo .eslintrc to write` });
  }

  // Handle Object vs string
  return rcFile.chainEdit('.eslintrc', getLintString(options.config), options);
};

/**
 * Produce function for generating the .editorconfig file
 * @param {object} options
 * @return {function}
 */
const makeEditorConfigHandler = (options) => {
  if (options.justHere) {
    return passThrough;
  }

  // No editorconfig entry? We're done here.
  if (!options.config.editorconfig) {
    return log => Object.assign(log, { data: `${log.data}\nNo .editorconfig to write` });
  }

  // Handle Object vs string
  return rcFile.chainEdit('.editorconfig', options.config.editorconfig, options);
};

/**
 *
 * @param {object} options
 * @return {Promise}
 */
const runConfig = options => installPackages(options.config.packages)
  .then(makeLintHandler(options))
  .then(makeEditorConfigHandler(options));

module.exports = runConfig;
