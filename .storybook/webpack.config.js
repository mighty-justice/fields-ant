// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      require.resolve('awesome-typescript-loader'),
      require.resolve('react-docgen-typescript-loader'),
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
