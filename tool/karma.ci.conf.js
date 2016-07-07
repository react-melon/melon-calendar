/**
 * @file karma test config using travis
 * @author cxtom <cxtom2008@gmail.com>
 */

/* eslint-disable no-console */

var _ = require('lodash');
// var fs = require('fs');

var karmaConfig = require('./karma/config');

var customLaunchers = {
    slChrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        platform: 'Windows 7',
        version: '45'
    },
    slFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '47',
        platform: 'Windows 7'
    },
    slIE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },
    slSafari: {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X El Capitan 10.11',
        version: '9'
    }
};

module.exports = function (config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (!process.env.SAUCE_USERNAME) {
        process.env.SAUCE_USERNAME = require('./sauce').username;
        process.env.SAUCE_ACCESS_KEY = require('./sauce').accessKey;
    }

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
