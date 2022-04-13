const dayjs = require('dayjs')
const environment = 'production';
const release = `${environment}@${dayjs().format('YYYY_MM_DD')}_b`;
const { override } = require('customize-cra');
// https://www.npmjs.com/package/@sentry/webpack-plugin
const SentryCliPlugin = require('@sentry/webpack-plugin');


// https://github.com/getsentry/sentry-webpack-plugin
const addSentryPlugin = () => (config) => {
  config.plugins.push(
    new SentryCliPlugin({
      release: release,
      authToken:
        '7abcd4c9b1df4380a604a8d313478eec315d23fe2e16422fb4e058e36970d5e0',
      url:'https://sentry.io',
      org:'shopee-ads',
      project:'react-demo',
      urlPrefix: '~/',
      include: './build',
      ignore: ['node_modules'],
    })
  );
  return config;
};

module.exports = {
  webpack: override(addSentryPlugin()),
  // devServer: {},
};


