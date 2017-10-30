/**
 * @file karma test common config
 * @author cxtom <cxtom2008@gmail.com>
 */

const path = require('path');

module.exports = {
    basePath: path.join(__dirname, '../../'),
    frameworks: ['jasmine'],
    files: [
        'test/index.js'
    ],
    browsers: ['Chrome'],
    preprocessors: {
        'src/**/*.js': ['coverage', 'sourcemap'],
        'test/**/*.js': ['webpack', 'sourcemap']
    },

    webpack: {
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loader: 'babel',
                    exclude: /node_modules/
                },
                {
                    test: /\.json$/,
                    loader: 'json'
                }
            ]
        },
        devtool: 'inline-source-map'
    },

    webpackMiddleware: {
        stats: 'errors-only'
    },

    // logLevel: config.LOG_DEBUG,
    reporters: ['coverage', 'mocha'],
    coverageReporter: {
        dir: path.join(__dirname, '../../coverage'),
        reporters: [
            // reporters not supporting the `file` property
            {type: 'html'},
            {type: 'lcovonly', subdir: 'lcov'}
        ]
    },
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
};
