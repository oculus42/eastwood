// check internal configs first.

// Then check for external configs as packages installed as eastwood-config-*

// Return the config in a resolved promise or a rejected promise if we fail.

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

