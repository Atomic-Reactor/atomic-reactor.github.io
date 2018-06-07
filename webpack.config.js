'use strict';

const path    = require('path');
const webpack = require('webpack');
const _       = require('underscore');
const env     = process.env.NODE_ENV || 'development';

module.exports = (gulpConfig, type = 'app') => {
    let config    = gulpConfig;
    let plugins   = [];
    let target    = 'web';
    let filename  = '[name].js';
    let entries   = ['babel-polyfill'];
        entries   = entries.concat(Object.values(config.entries));
    let dest      = config.dest.js;
    let externals = [];
    let tools     = (env === 'development') ? 'source-map' : '';

    // Only override process.env on client side
    if ( type === 'app' ) {
        config.defines['process.env'] = {
            NODE_ENV: JSON.stringify(env)
        };
    }
    plugins.push(new webpack.DefinePlugin(config.defines));
    plugins.push(new webpack.ContextReplacementPlugin(/^components/, context => {
        context.request = path.resolve('./src/app/components');
    }));
    plugins.push(new webpack.ContextReplacementPlugin(/^reactium-core\/components/, context => {
        context.request = path.resolve('./.core/components');
    }));

    return {
        target: target,
        entry: entries,
        devtool: tools,
        plugins: plugins,
        externals: externals,
        mode: env,
        output:  {
            path: path.resolve(__dirname, dest),
            filename: filename,
        },
        optimization: {
            minimize: Boolean(env !== 'development'),
            splitChunks: {
                cacheGroups: {
                    commons: {
                        test: /[\\/]node_modules[\\/]/,
                        name: "vendors",
                        chunks: "all"
                    }
                }
            },
        },
        module:  {
            rules: [
                {
                    test: [/.js$/],
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ]
                }
            ]
        }
    };
};
