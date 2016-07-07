/**
 * @file karma test config using travis
 * @author cxtom <cxtom2008@gmail.com>
 */

var _ = require('lodash');

var karmaConfig = require('./karma/config');

var customLaunchers = {
    slChrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 7',
        version: '35'
    },
    slFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '30'
    },
    slIE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    }
};

module.exports = function (config) {
    config.set(_.extend(karmaConfig, {
        sauceLabs: {
            testName: 'Web App Unit Tests'
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['progress', 'coverage', 'mocha', 'dots', 'saucelabs'],
        singleRun: true
    }));
};
