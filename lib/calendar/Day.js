(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', '../util', './Item', 'lodash/omit', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../util'), require('./Item'), require('lodash/omit'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.util, global.Item, global.omit, global.babelHelpers);
        global.Day = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _util, _Item2, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var DateTime = babelHelpers.interopRequireWildcard(_util);

    var _Item3 = babelHelpers.interopRequireDefault(_Item2);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file Calendar/CalendarDay
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarDay');

    /**
     * melon-calendar 日期选择单元
     *
     * @class
     * @extends {Item}
     */

    var CalendarDay = function (_Item) {
        babelHelpers.inherits(CalendarDay, _Item);

        function CalendarDay() {
            babelHelpers.classCallCheck(this, CalendarDay);
            return babelHelpers.possibleConstructorReturn(this, _Item.apply(this, arguments));
        }

        CalendarDay.prototype.render = function render() {
            var _props = this.props,
                date = _props.date,
                selected = _props.selected,
                others = babelHelpers.objectWithoutProperties(_props, ['date', 'selected']);


            var className = cx(this.props).addVariants(DateTime.isEqualDate(date, new Date()) ? 'today' : null).addStates({ selected: selected }).build();

            return _react2['default'].createElement(
                'a',
                babelHelpers['extends']({}, (0, _omit2['default'])(others, ['variants']), {
                    className: className,
                    href: '#',
                    onClick: this.onClick }),
                date.getDate()
            );
        };

        return CalendarDay;
    }(_Item3['default']);

    exports['default'] = CalendarDay;


    CalendarDay.displayName = 'CalendarDay';

    CalendarDay.propTypes = {
        date: _react.PropTypes.object.isRequired,
        onClick: _react.PropTypes.func,
        disabled: _react.PropTypes.bool,
        selected: _react.PropTypes.bool
    };
});
//# sourceMappingURL=Day.js.map
