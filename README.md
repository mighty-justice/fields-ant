# Fields Ant

[![npm Version](https://img.shields.io/npm/v/@mighty-justice/fields-ant.svg)](https://www.npmjs.com/package/@mighty-justice/fields-ant) [![Build Status](https://travis-ci.org/mighty-justice/fields-ant.svg?branch=master)](https://travis-ci.org/mighty-justice/fields-ant) [![Coverage Status](https://coveralls.io/repos/github/mighty-justice/fields-ant/badge.svg?branch=master)](https://coveralls.io/github/mighty-justice/fields-ant?branch=master)

A standard interface for Field Sets at [Mighty](https://www.mighty.com/)
and a collection of utilities and components like forms and cards for 
[Ant Design](https://ant.design/) which use that interface.

| [Documentation](https://mighty-justice.github.io/fields-ant/) |
| -------------------------------------------------------------- |

## Installation
#### dependencies
```
"@mighty-justice/smart-bool": "0",
"@mighty-justice/utils": "0",
"antd": "3",
"class-autobind-decorator": "3",
"classnames": "2",
"date-fns": "1",
"flat": "4",
"iso8601-duration": "1",
"lodash": "4",
"mobx": "5",
"mobx-react": "5",
"moment": "2",
"react": "16"
```

#### npm
`npm install --save-dev @mighty-justice/fields-ant`

#### yarn
`yarn add --dev @mighty-justice/fields-ant`

### Releasing a new version

- Release: `npm run deploy`

This will run checks for `test`, `lint`, `build`, bump the version number,
publish to npm, and publish the docs to Github Pages.

### Contributing

We accept new issues and pull requests from anyone!

