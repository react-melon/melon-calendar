(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', '../util', './Item', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('../util'), require('./Item'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.util, global.Item, global.babelHelpers);
        global.Day = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _util, _Item2, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var DateTime = babelHelpers.interopRequireWildcard(_util);

    var _Item3 = babelHelpers.interopRequireDefault(_Item2);

    /**
     * @file Calendar/CalendarDay
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarDay');

    var CalendarDay = function (_Item) {
        babelHelpers.inherits(CalendarDay, _Item);

        function CalendarDay() {
            babelHelpers.classCallCheck(this, CalendarDay);
            return babelHelpers.possibleConstructorReturn(this, _Item.apply(this, arguments));
        }

        CalendarDay.prototype.render = function render() {
            var _props = this.props;
            var date = _props.date;
            var selected = _props.selected;
            var others = babelHelpers.objectWithoutProperties(_props, ['date', 'selected']);


            var className = cx(this.props).addVariants(DateTime.isEqualDate(date, new Date()) ? 'today' : null).addStates({ selected: selected }).build();

            return _react2['default'].createElement(
                'a',
                babelHelpers['extends']({}, others, {
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
