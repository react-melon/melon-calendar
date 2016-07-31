/**
 * @file karma test config using travis
 * @author cxtom <cxtom2008@gmail.com>
 */

/* eslint-disable no-console */

var _ = require('lodash');

var karmaConfig = require('./karma/config');

var customLaunchers = {
    slChrome: {
        base: 'SauceLabs',
        browserName: 'chrome',
        version: '48',
        platform: 'Windows 7'
    },
    slFirefox: {
        base: 'SauceLabs',
        browserName: 'firefox',
        version: '45',
        platform: 'Windows 10'
    },
    slIE11: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
    },
    slIE10: {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8',
        version: '10'
    }
};

module.exports = function (config) {

    // Use ENV vars on Travis and sauce.json locally to get credentials
    if (!process.env.SAUCE_USERNAME) {
        process.env.SAUCE_USERNAME = 'chxtom';
        process.env.SAUCE_ACCESS_KEY = '58362feb-88df-4f5c-a2fc-e15179f52870';
    }

    config.set(_.extend(karmaConfig, {
        sauceLabs: {
            'testName': 'Web App Unit Tests',
            'public': 'public'
        },
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        reporters: ['coverage', 'mocha', 'dots', 'saucelabs'],
        singleRun: true
    }));
};
