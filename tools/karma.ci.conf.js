/**
 * @file karma test config using travis
 * @author cxtom <cxtom2008@gmail.com>
 */

/* eslint-disable no-console */

var _ = require('lodash');

var karmaConfig = require('./karma/config');

module.exports = function (config) {

    config.set(_.extend(karmaConfig, {
        customLaunchers: {
            ChromeTravis: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        browsers: ['ChromeTravis'],
        reporters: ['coverage', 'mocha', 'dots', 'saucelabs'],
        singleRun: true
    }));
};
