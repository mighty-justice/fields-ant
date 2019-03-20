// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
  });

  config.plugins.push(new TSDocgenPlugin());

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
