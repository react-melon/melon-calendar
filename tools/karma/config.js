/**
 * @file karma test common config
 * @author cxtom <cxtom2008@gmail.com>
 */

var path = require('path');

var NODE_MODULES_FILES = '**/node_modules/**';

var babelOpts = require('../../package.json').babel;

module.exports = {
    basePath: path.join(__dirname, '../../'),
    frameworks: ['browserify', 'jasmine'],
    files: [
        './node_modules/jasmine-expect-jsx/dist/jasmine-expect-jsx.js', // expect-jsx
        './test/**/*.spec.js'
    ],
    browsers: ['Chrome'],
    preprocessors: {
        './test/components/*.spec.js': ['browserify'],
        './test/components/**/*.spec.js': ['browserify'],
        './src/*.js': ['browserify', 'coverage']
    },

    browserify: {
        debug: true,
        paths: ['./src/*.js', './test/components/**.spec.js'],

        transform: [

            ['babelify', babelOpts],

            ['browserify-istanbul', {
                instrumenter: require('babel-istanbul'),
                instrumenterConfig: {
                    babel: babelOpts
                },
                ignore: [
                    NODE_MODULES_FILES
                ]
            }]
        ],
        extensions: ['.js']
    },
    // logLevel: config.LOG_DEBUG,
    reporters: ['coverage', 'mocha'],
    coverageReporter: {
        dir: path.join(__dirname, '../../coverage'),
        reporters: [
            // reporters not supporting the `file` property
            {type: 'html'},
            {type: 'lcov', subdir: 'lcov'}
        ]
    },
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
};
