const webpack = require('webpack')
module.exports = function override(config, env) {
    config.resolve.fallback = {
        'util': require.resolve('util/'),
        'url': require.resolve('url'),
        'assert': require.resolve('assert'),
        'buffer': require.resolve('buffer'),
        'fs': false,
        'path': require.resolve('path'),
        'crypto': false,
        "http": require.resolve("stream-http")
    }
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer']
        })
    )

    return config
}