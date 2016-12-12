(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'react-dom', 'melon-core/classname/cxBuilder', './SelectorItem', '../util', 'melon-core/util/array', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('react-dom'), require('melon-core/classname/cxBuilder'), require('./SelectorItem'), require('../util'), require('melon-core/util/array'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.reactDom, global.cxBuilder, global.SelectorItem, global.util, global.array, global.babelHelpers);
        global.Selector = mod.exports;
    }
})(this, function (exports, _react, _reactDom, _cxBuilder, _SelectorItem, _util, _array, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _reactDom2 = babelHelpers.interopRequireDefault(_reactDom);

    var _SelectorItem2 = babelHelpers.interopRequireDefault(_SelectorItem);

    var DateTime = babelHelpers.interopRequireWildcard(_util);
    /**
     * @file Calendar/CalendarSelector
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarSelector');

    /**
     * melon-calendar 年/月选择面板
     *
     * @class
     * @extends {React.Component}
     */

    var CalendarSelector = function (_Component) {
        babelHelpers.inherits(CalendarSelector, _Component);

        /**
         * 构造函数
         *
         * @param  {Object} props   组件属性
         * @public
         */
        function CalendarSelector(props) {
            babelHelpers.classCallCheck(this, CalendarSelector);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.componentDidMount = _this.autoScroll;
            _this.componentDidUpdate = _this.autoScroll;

            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        /**
         * 组件mount时触发，当前选择的年/月需要在可见范围
         *
         * @public
         */


        /**
         * 组件更新时触发，当前选择的年/月需要在可见范围
         *
         * @public
         */


        CalendarSelector.prototype.autoScroll = function autoScroll() {
            var item = this.refs.item ? _reactDom2['default'].findDOMNode(this.refs.item) : null;
            item && item.scrollIntoView && item.scrollIntoView();
        };

        CalendarSelector.prototype.onClick = function onClick(e) {

            var onChange = this.props.onChange;

            if (onChange) {
                onChange({
                    target: this,
                    mode: e.mode,
                    date: e.date
                });
            }
        };

        CalendarSelector.prototype.isMonthView = function isMonthView() {
            var _props = this.props,
                minDate = _props.minDate,
                maxDate = _props.maxDate,
                mode = _props.mode;


            var onlyOneYear = false;

            // 如果范围中只有一年，则跳过yearview，直接显示month view
            if (mode === 'year' && DateTime.isDate(minDate) && DateTime.isDate(maxDate)) {
                onlyOneYear = DateTime.yearDiff(minDate, maxDate) === 0;
            }

            return mode === 'month' || onlyOneYear;
        };

        CalendarSelector.prototype.render = function render() {
            var _this2 = this;

            var _props2 = this.props,
                minDate = _props2.minDate,
                maxDate = _props2.maxDate,
                date = _props2.date,
                rest = babelHelpers.objectWithoutProperties(_props2, ['minDate', 'maxDate', 'date']);


            var children = [];

            var y = date.getFullYear();
            var m = date.getMonth();
            var d = date.getDate();

            if (this.isMonthView()) {
                children = (0, _array.range)(12).map(function (month, index) {

                    var newDate = new Date(y, month, d);
                    var disabled = DateTime.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate) || DateTime.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate);
                    var selected = month === m;

                    return _react2['default'].createElement(_SelectorItem2['default'], {
                        key: index,
                        mode: 'month',
                        ref: selected ? 'item' : null,
                        date: newDate,
                        onClick: _this2.onClick,
                        disabled: disabled,
                        selected: selected });
                });
            } else {

                var maxRange = CalendarSelector.MAX_RANGE;

                (0, _array.range)(y - maxRange, y + maxRange).forEach(function (year, index) {

                    if (DateTime.isDate(minDate) && year < minDate.getFullYear() || DateTime.isDate(maxDate) && year > maxDate.getFullYear()) {

                        return;
                    }

                    var newDate = new Date(year, m, d);
                    var selected = year === y;

                    children.push(_react2['default'].createElement(_SelectorItem2['default'], {
                        key: index,
                        mode: 'year',
                        ref: selected ? 'item' : null,
                        date: newDate,
                        onClick: _this2.onClick,
                        selected: selected }));
                });
            }

            return _react2['default'].createElement(
                'ul',
                babelHelpers['extends']({}, rest, { className: cx(this.props).build() }),
                children
            );
        };

        return CalendarSelector;
    }(_react.Component);

    exports['default'] = CalendarSelector;


    CalendarSelector.displayName = 'CalendarSelector';

    CalendarSelector.MAX_RANGE = 10;

    CalendarSelector.propTypes = {
        date: _react.PropTypes.object.isRequired,
        maxDate: _react.PropTypes.object,
        minDate: _react.PropTypes.object,
        onChange: _react.PropTypes.func,
        mode: _react.PropTypes.oneOf(['month', 'year'])
    };
});
//# sourceMappingURL=Selector.js.map
