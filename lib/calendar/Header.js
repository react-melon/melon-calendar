(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../util', 'melon-core/classname/cxBuilder', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../util'), require('melon-core/classname/cxBuilder'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.util, global.cxBuilder, global.babelHelpers);
        global.Header = mod.exports;
    }
})(this, function (exports, _react, _util, _cxBuilder, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var DateTime = babelHelpers.interopRequireWildcard(_util);
    /**
     * @file Calendar/CalendarHeader
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarHeader');

    /**
     * CalendarHeader
     *
     * @class
     * @extends {React.Component}
     */

    var CalendarHeader = function (_Component) {
        babelHelpers.inherits(CalendarHeader, _Component);

        function CalendarHeader() {
            babelHelpers.classCallCheck(this, CalendarHeader);
            return babelHelpers.possibleConstructorReturn(this, _Component.apply(this, arguments));
        }

        CalendarHeader.prototype.render = function render() {
            var _props = this.props,
                date = _props.date,
                rest = babelHelpers.objectWithoutProperties(_props, ['date']);


            var year = date.getFullYear();

            var week = DateTime.getDayOfWeek(date);
            var month = DateTime.getShortMonth(date);
            var day = date.getDate();

            var fullDate = month + day + '日';

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, rest, { className: cx(this.props).build() }),
                _react2['default'].createElement(
                    'p',
                    { className: cx.getPartClassName('year') },
                    year
                ),
                _react2['default'].createElement(
                    'p',
                    { className: cx.getPartClassName('week') },
                    week
                ),
                _react2['default'].createElement(
                    'p',
                    { className: cx.getPartClassName('date') },
                    fullDate
                )
            );
        };

        return CalendarHeader;
    }(_react.Component);

    exports['default'] = CalendarHeader;


    CalendarHeader.displayName = 'CalendarHeader';

    CalendarHeader.propTypes = {
        date: _react.PropTypes.object.isRequired
    };
});
//# sourceMappingURL=Header.js.map
