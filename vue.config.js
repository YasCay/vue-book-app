const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'https://openlibrary.org',
        changeOrigin: true,
        pathRewrite: { '^/api': '' }
      }
    }
  }
});
