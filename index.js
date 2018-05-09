/* eslint no-console:0 */

const getConfig = require('./src/getConfig');
const runConfig = require('./src/runConfig');

const run = configName => getConfig(configName)
  .then((config) => {
    console.log(`Installing ${configName}`);
    return config;
  })
  .then(runConfig)
  .then(({ data }) => console.log(data), err => console.error(err));

module.exports = run;
