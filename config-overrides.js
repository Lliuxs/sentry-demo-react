const { override } = require('customize-cra');
// https://www.npmjs.com/package/@sentry/webpack-plugin
const SentryCliPlugin = require('@sentry/webpack-plugin');

// https://github.com/getsentry/sentry-webpack-plugin
const addSentryPlugin = () => (config) => {
  config.plugins.push(
    new SentryCliPlugin({
      // release: '1.0.0',
      authToken:
        '4c979c29b1794e86ab10f320193cb7f7efe43aacc10740dfa243ab7ae801635a',
      url: 'http://127.0.0.1:9000',
      // url: 'https://sentry.io',
      org: 'shopee',
      project: 'react',
      urlPrefix: '~/',
      include: './build',
      ignore: ['node_modules'],
    })
  );
  return config;
};

module.exports = {
  // webpack: override(addSentryPlugin()),
  // devServer: {},
};


