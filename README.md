# Fields Ant

[![npm Version](https://img.shields.io/npm/v/@mighty-justice/fields-ant.svg)](https://www.npmjs.com/package/@mighty-justice/fields-ant) [![Build Status](https://travis-ci.org/mighty-justice/fields-ant.svg?branch=master)](https://travis-ci.org/mighty-justice/fields-ant) [![Coverage Status](https://coveralls.io/repos/github/mighty-justice/fields-ant/badge.svg?branch=master)](https://coveralls.io/github/mighty-justice/fields-ant?branch=master)

A standard library / interface for building Forms and standard CRUD components 
in [Ant Design](https://ant.design/).

Open source, developed primarily at [Mighty](https://www.mighty.com/).

| [Documentation](https://mighty-justice.github.io/fields-ant/) |
| -------------------------------------------------------------- |

# Introduction / Concepts



# Installation

```
yarn add @mighty-justice/fields-ant
```

```
npm install @mighty-justice/fields-ant
```

#### peer dependencies
```
"antd": "^3.0.0",
"lodash": "^4.0.0",
"mobx": "^4.0.0 || ^5.0.0",
"mobx-react": "^5.0.0",
"moment": "^2.0.0",
"react": "^16.0.0"
```

#### npm
`npm install --save-dev @mighty-justice/fields-ant`

#### yarn
`yarn add --dev @mighty-justice/fields-ant`

# Contributing

We accept new issues and pull requests from anyone!

# Releasing a new version

- Release: `npm run deploy`

This will run checks for `test`, `lint`, `build`, bump the version number,
publish to npm, and publish the docs to Github Pages.

Gotchas:

- Make sure to `npm install` or `yarn install` first
- The deploy command must currently be run with npm not yarn due to login bug
