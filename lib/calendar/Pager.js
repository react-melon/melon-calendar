(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'melon/Icon', '../util', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('melon/Icon'), require('../util'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.Icon, global.util, global.babelHelpers);
        global.Pager = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _Icon, _util, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var DateTime = babelHelpers.interopRequireWildcard(_util);
    /**
     * @file Calendar/CalendarPager
     * @author cxtom(cxtom2008@gmail.com)
     */

    var cx = (0, _cxBuilder.create)('CalendarPager');

    /**
     * melon-calendar 日期翻页器
     *
     * @class
     * @extends {React.Component}
     */

    var CalendarPager = function (_Component) {
        babelHelpers.inherits(CalendarPager, _Component);

        /**
         * 构造函数
         *
         * @param  {Object} props   组件属性
         * @public
         */
        function CalendarPager(props) {
            babelHelpers.classCallCheck(this, CalendarPager);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        /**
         * 点击翻页事件
         *
         * @param  {Object} e   事件对象
         * @private
         */


        CalendarPager.prototype.onClick = function onClick(e) {

            var target = e.currentTarget;
            var month = this.props.month;

            var action = target.getAttribute('data-action');
            var newMonth = DateTime.addMonths(month, action === 'next' ? 1 : -1);

            var onChange = this.props.onChange;

            if (onChange) {
                onChange({
                    target: this,
                    month: newMonth
                });
            }
        };

        CalendarPager.prototype.render = function render() {
            var _props = this.props,
                maxDate = _props.maxDate,
                minDate = _props.minDate,
                month = _props.month;


            var m = month.getMonth() + 1;
            var y = month.getFullYear();

            var beforeState = {
                disabled: DateTime.isDate(minDate) && DateTime.isBeforeMonth(DateTime.addMonths(month, -1), minDate)
            };

            var nextState = {
                disabled: DateTime.isDate(maxDate) && DateTime.isAfterMonth(DateTime.addMonths(month, 1), maxDate)
            };

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                _react2['default'].createElement(_Icon2['default'], {
                    icon: 'navigate-before',
                    'data-role': 'pager',
                    className: cx().part('prev').addStates(beforeState).build(),
                    'data-action': 'prev',
                    onClick: beforeState.disabled ? null : this.onClick }),
                _react2['default'].createElement(_Icon2['default'], {
                    icon: 'navigate-next',
                    'data-role': 'pager',
                    className: cx().part('next').addStates(nextState).build(),
                    'data-action': 'next',
                    onClick: nextState.disabled ? null : this.onClick }),
                y + ' 年 ' + m + ' 月'
            );
        };

        return CalendarPager;
    }(_react.Component);

    exports['default'] = CalendarPager;


    CalendarPager.displayName = 'CalendarPager';

    CalendarPager.propTypes = {
        month: _react.PropTypes.object.isRequired,
        maxDate: _react.PropTypes.object,
        minDate: _react.PropTypes.object,
        onChange: _react.PropTypes.func
    };
});
//# sourceMappingURL=Pager.js.map
