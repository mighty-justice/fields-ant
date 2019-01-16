// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader');
const TSDocgenPlugin = require('react-docgen-typescript-webpack-plugin');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.module.rules.push({
    test: /\.(ts|tsx)$/,
    loader: require.resolve('awesome-typescript-loader')
  });
  defaultConfig.plugins.push(new TSDocgenPlugin());
  defaultConfig.resolve.extensions.push('.ts', '.tsx');
  return defaultConfig;
};


// module.exports = {
//   // Currently we need to add '.ts' to the resolve.extensions array.
//   resolve: { extensions: ['.ts', '.tsx', '.js', '.jsx'] },
//   module: { rules: [
//     { test: /\.tsx?$/, loader: 'awesome-typescript-loader', options: { transpileOnly: true } },
//     { test: /\.css$/, use: ['style-loader','css-loader'] }
//   ]},
//   plugins: [
//     new CheckerPlugin(),
//     new TSDocgenPlugin(),
//   ]
// };
