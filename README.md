# Eastwood

[![npm](https://img.shields.io/npm/v/eastwood.svg)](https://www.npmjs.com/package/eastwood)

Eastwood aims to provide simple setup of ESLint and editor configurations.
3.0.0 correctly installs packages as devDependencies.

## Installation

```bash
npm install -g eastwood
```

## Use

```bash
eastwood airbnb
```

### Supported Rulesets

* `airbnb` - The [Airbnb Style Guide](http://airbnb.io/javascript/) as provided by [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb).
* `airbnb-base` - Airbnb without React support as provided by [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base).
* `google` - The [Google Style Guide](https://google.github.io/styleguide/jsguide.html) as provided by [eslint-config-google](https://www.npmjs.com/package/eslint-config-google).

If no ruleset is provided, `airbnb` is used as default.

## Plans

* Updating `.eslintrc` rather than just an initial write.
* Updating ``.editorconfig` rather than just an initial write.

And maybe:

* Prettier?
* Plugin support for configs?
* Who knows?
