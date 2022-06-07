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
          "@primary-color-opaque": "#43E0CB1A",
          "@primary-1": "#000000",
          "@text-color": "#FFFFFF",
          "@component-background": "#ffffff00",
          //header menu-item
          "@menu-item-vertical-margin": "8px",
          "@input-bg": "@primary-color-opaque",
          "@input-color": "@primary-1",
          "@input-placeholder-color": "@primary-1",
          "@input-padding": "8px 12px",
          "@menu-item-font-size": "16px",
          "@menu-item-active-color": "@text-color",
          "@menu-inline-submenu-bg": "@primary-1",
          "@select-background": "@primary-color-opaque",
          "@select-dropdown-bg": "@primary-1",
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
