/* eslint no-console:0 */

const getConfig = require('./src/getConfig');
const runConfig = require('./src/runConfig');

const run = options => getConfig(options.configName)
  .then((config) => {
    console.log(`Installing ${options.configName}${options.justHere ? ' in current directory' : ''}`);

    return Object.assign({}, options, {
      config,
    });
  })
  .then(runConfig)
  .then(({ data }) => console.log(data), err => console.error(err));

module.exports = run;
