/**
 * @file karma test common config
 * @author cxtom <cxtom2008@gmail.com>
 */

const path = require('path');

module.exports = {
    basePath: path.join(__dirname, '../../'),
    frameworks: ['jasmine'],
    files: [
        './node_modules/jasmine-expect-jsx/dist/jasmine-expect-jsx.js', // expect-jsx
        './test/**/*.spec.js'
    ],
    browsers: ['Chrome'],
    preprocessors: {
        './test/**/*.spec.js': ['webpack'],
        './src/*.js': ['coverage']
    },

    webpack: {
        module: {
            preLoaders: [
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
        externals: {
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': true
        }
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
    singleRun: true
};
