const fs = require('fs');
const pkgDir = require('pkg-dir');

// Track internal Configs
const formatAirbnb = require('../formats/airbnb');
const formatAirbnbBase = require('../formats/airbnb-base');
const formatGoogle = require('../formats/google');
const formatReactApp = require('../formats/react-app');
const formatStandard = require('../formats/standard');
const formatStandardEslint = require('../formats/standard-eslint');

const internalConfigs = {
  airbnb: formatAirbnb,
  'airbnb-base': formatAirbnbBase,
  google: formatGoogle,
  'react-app': formatReactApp,
  standard: formatStandard,
  'standard-eslint': formatStandardEslint,
};

/**
 * Get the parsed package.json from a module
 * @param {String} path
 * @return {Promise<object>}
 */
const getPackageJson = path => new Promise((resolve, reject) => {
  fs.readFile(`${path}/package.json`, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(JSON.parse(data));
  });
});

/**
 * Load an external config resource
 * @param {string} path
 * @return {Promise<object>}
 */
const extractExternalConfig = path => getPackageJson(path)
  .then(data => `${path}/${data.main || 'index.js'}`)
  // Take a stab at the default file location
  .catch(() => `${path}/index.js`)
  .then(require);

/**
 * Get internal or external config object
 * @param {string} configName
 * @return {Promise}
 */
const getConfig = (configName) => {
  // check internal configs first.
  if (internalConfigs[configName] !== undefined) {
    return Promise.resolve(internalConfigs[configName]);
  }

  /*
   * TODO - Support globally installed Eastwood configs
   * The following doesn't find global or local packages
   */
  // return Promise.resolve(`eastwood-config-${configName}`).then(require);

  // Then check for external configs as packages installed as eastwood-config-*
  return pkgDir()
    .then((dir) => {
      if (dir === undefined) {
        return Promise.reject(new ReferenceError('Cannot locate package root to check for configs.'));
      }

      // Construct external package name
      const path = `${dir}/node_modules/eastwood-config-${configName}`;

      // Return the config in a resolved promise or a rejected promise if we fail.
      return new Promise((resolve, reject) => {
        fs.stat(path, (err) => {
          // Check if error defined and the error code is "not exists"
          if (err) {
            // 34 = folder doesn't exist
            if (err.code === 'ENOENT' || err.errno === 34) {
              reject(new Error('Config package not found.'));
            } else {
              reject(err);
            }
          }
          resolve(path);
        });
      })
        .then(extractExternalConfig);
    });
};

module.exports = getConfig;
