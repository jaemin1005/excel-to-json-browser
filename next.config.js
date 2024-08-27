// next.config.js
module.exports = {
  webpack: (config) => {
    config.experiments = {
      asyncWebAssembly: true,
      syncWebAssembly: true,
      layers: true,
    };

    config.module.rules.push({
      test: /\.wasm$/,
      use: {
        loader: 'wasm-loader',
      },
    });

    return config;
  },
};