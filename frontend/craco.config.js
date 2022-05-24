const { ESLINT_MODES } = require("@craco/craco");

module.exports = {
  eslint: {
    mode: ESLINT_MODES.file,
  },
  plugins: [
    {
      plugin: require("craco-antd"),
      options: {
        customizeTheme: {
          "@primary-color": "#1DA57A",
        },
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
