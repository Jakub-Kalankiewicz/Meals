const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': Object.keys(process.env).reduce((env, key) => {
          env[key] = JSON.stringify(process.env[key]);
          return env;
        }, {})
      })
    ]
  }
};
