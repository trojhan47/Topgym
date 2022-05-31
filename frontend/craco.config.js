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
          "@primary-color": "#43E0CB",
          "@primary-1": "#000000",
          "@text-color": "#FFFFFF",
          "@component-background": "#ffffff00",
          //header menu-item
          "@menu-item-vertical-margin": "8px",
          "@input-bg": "#43E0CB1A",
          "@input-color": "@primary-1",
          "@input-placeholder-color": "@primary-1",
          "@input-padding": "8px 12px",
          "@menu-dark-inline-submenu-item-color": "#FFFF00",
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
