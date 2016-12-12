(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', './Item', '../util', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('./Item'), require('../util'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Item, global.util, global.babelHelpers);
        global.SelectorItem = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Item2, _util, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Item3 = babelHelpers.interopRequireDefault(_Item2);

    var DateTime = babelHelpers.interopRequireWildcard(_util);
    /**
     * @file Calendar/CalendarSelectorItem
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarSelectorItem');

    /**
     * melon-calendar 年、月选择单元
     *
     * @class
     * @extends {Item}
     */

    var CalendarSelectorItem = function (_Item) {
        babelHelpers.inherits(CalendarSelectorItem, _Item);

        function CalendarSelectorItem() {
            babelHelpers.classCallCheck(this, CalendarSelectorItem);
            return babelHelpers.possibleConstructorReturn(this, _Item.apply(this, arguments));
        }

        CalendarSelectorItem.prototype.render = function render() {

            var props = this.props;

            var date = props.date,
                mode = props.mode,
                disabled = props.disabled,
                selected = props.selected,
                others = babelHelpers.objectWithoutProperties(props, ['date', 'mode', 'disabled', 'selected']);


            return _react2['default'].createElement(
                'li',
                babelHelpers['extends']({}, others, {
                    'data-mode': mode,
                    'data-value': date,
                    onClick: disabled ? null : this.onClick,
                    className: cx(props).addStates({ selected: selected }).build() }),
                _react2['default'].createElement(
                    'span',
                    null,
                    mode === 'year' ? date.getFullYear() : DateTime.getShortMonth(date)
                )
            );
        };

        return CalendarSelectorItem;
    }(_Item3['default']);

    exports['default'] = CalendarSelectorItem;


    CalendarSelectorItem.displayName = 'CalendarSelectorItem';

    CalendarSelectorItem.propTypes = {
        date: _react.PropTypes.object.isRequired,
        onClick: _react.PropTypes.func,
        disabled: _react.PropTypes.bool,
        selected: _react.PropTypes.bool,
        mode: _react.PropTypes.oneOf(['month', 'year'])
    };
});
//# sourceMappingURL=SelectorItem.js.map
