# melon-calendar

[![Coverage Status](https://coveralls.io/repos/github/react-melon/melon-calendar/badge.svg?branch=master)](https://coveralls.io/github/react-melon/melon-calendar?branch=master)
[![Version](https://img.shields.io/npm/v/melon-calendar.svg)](https://www.npmjs.com/package/melon-calendar)
[![Build](https://img.shields.io/travis/react-melon/melon-calendar.svg?style=flat-square)](https://travis-ci.org/react-melon/melon-calendar)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/melon-calendar.svg)](https://saucelabs.com/u/melon-calendar)

DatePicker Components in [React Melon Family](http://react-melon.github.io/melon/)

### members

* Calendar - pick a date
* RangeCalendar - Select a date interval by day
* UnitCalendar - Select a date interval by week, month or year

## Screenshots

* Calendar

![Calendar](./example/screenshots/calendar-web.gif)

## Install

### npm

[![melon-calendar](https://nodei.co/npm/melon-calendar.png)](https://npmjs.org/package/melon-calendar)

### bower

```
bower install melon-calendar
```

## Usage

```js
import Calendar from 'melon-calendar/Calendar';
import React from 'react';
import ReactDOM from 'react-dom';
ReactDOM.render(<Calendar />, container);
```

## Examples

[demo](http://react-melon.github.io/melon/#/components?name=Calendar)

## Test Case

```
npm test
npm run test:local
```