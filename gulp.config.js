'use strict';

const path    = require('path');
const globby  = require('globby');

module.exports = () => {
    return {
        entries: globby.sync(path.resolve('./src/app/', '*.js')),
        defines: {},
        browsers: 'last 1 version',
        port: {
            browsersync: 3000,
            proxy: 3030,
        },
        cssPreProcessor: 'sass',
        watch: {
            js: [
                "src/app/**/*",
                "!{src/assets/design-system,src/assets/design-system/**}",
            ],
            markup: [
                "src/**/*.html",
                "src/assets/style/**/*.css",
                "!{src/assets/design-system,src/assets/design-system/**}",
            ],
            style: [
                "src/assets/**/*.less",
                "src/assets/**/*.scss",
                "src/assets/**/*.sass",
                "src/assets/design-system/src/assets/toolkit/styles/**/*.scss",
            ],
            assets: [
                "src/assets/**/*",
                "!{src/assets/style,src/assets/style/**}",
                "!{src/assets/js,src/assets/js/**}",
                "!{src/assets/design-system,src/assets/design-system/**}",
            ],
            server: [
                "src/index.js",
                "src/server/**/*.js",
            ],
            templates: [
                "src/server/**/*.hbs",
            ],
            toolkit: {
                assets: [
                    "src/assets/design-system/src/assets/toolkit/**",
                    "!{src/assets/design-system/src/assets/toolkit/scripts,src/assets/design-system/src/assets/toolkit/scripts/**}",
                    "!{src/assets/design-system/src/assets/toolkit/styles,src/assets/design-system/src/assets/toolkit/styles/**}",
                ],
            },
        },
        src: {
            app: 'src',
            js: [
                "src/app/**/*",
                "!{src/assets/design-system,src/assets/design-system/**}",
            ],
            markup: [
                "src/**/*.html",
                "!src/assets/design-system/**",
                "!{src/assets/design-system,src/assets/design-system/**}",
            ],
            style: [
                "src/assets/style/*.scss",
                "!{src/assets/design-system,src/assets/design-system/**}",
            ],
            assets: [
                "src/assets/**/*",
                "!{src/assets/style,src/assets/style/**}",
                "!{src/assets/js,src/assets/js/**}",
                "!{src/assets/design-system,src/assets/design-system/**}",
            ],
            toolkit: {
                assets: [
                    "src/assets/design-system/src/assets/toolkit/**",
                    "!{src/assets/design-system/src/assets/toolkit/scripts,src/assets/design-system/src/assets/toolkit/scripts/**}",
                    "!{src/assets/design-system/src/assets/toolkit/styles,src/assets/design-system/src/assets/toolkit/styles/**}",
                ],
            },
            includes: ["./node_modules", "./src/assets/design-system/node_modules"],
            appdir: path.resolve(__dirname, 'src/app'),
            rootdir: path.resolve(__dirname),
        },
        dest: {
            dist: 'docs',
            js: 'docs/assets/js',
            markup: 'docs',
            style: 'docs/assets/style',
            assets: 'docs/assets',
            toolkit: {
                assets: 'docs/assets'
            }
        },
    };
};
