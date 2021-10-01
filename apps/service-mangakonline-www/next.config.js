const webpack = require('webpack');
const withNx = require('@nrwl/next/plugins/with-nx');
// const path = require('path');

const nextConfig = {
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],

  images: {
    domains: [
      'stg.legion-tactics.com', // staging version
      'www.legion-tactics.com', // production version
    ]
  },

  webpack: (config, { isServer }) => {
    // // Fixes npm packages that depend on `fs` module
    // config.node = {
    //   fs: 'empty'
    // };
    
    // config.resolve.alias['components'] = path.join(__dirname, 'components')
    // config.resolve.alias['containers'] = path.join(__dirname, 'containers')
    // config.resolve.alias['libraries'] = path.join(__dirname, 'libraries')
    // config.resolve.alias['utils'] = path.join(__dirname, 'utils')

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.DEBUG": `"${process.env.DEBUG || ''}"`,
        "process.env.GRAPHQL_GATEWAY": `"${isServer ? process.env.GRAPHQL_GATEWAY_SERVER : process.env.GRAPHQL_GATEWAY_CLIENT}"`,
      })
    );

    return config;
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = withNx(nextConfig);
