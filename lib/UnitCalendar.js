(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/classname/cxBuilder', 'melon-core/InputComponent', 'melon/BoxGroup', './util', 'lodash/omit', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/classname/cxBuilder'), require('melon-core/InputComponent'), require('melon/BoxGroup'), require('./util'), require('lodash/omit'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.cxBuilder, global.InputComponent, global.BoxGroup, global.util, global.omit, global.babelHelpers);
        global.UnitCalendar = mod.exports;
    }
})(this, function (exports, _react, _cxBuilder, _InputComponent2, _BoxGroup, _util, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;
    exports.normalize = normalize;
    exports.getNextTime = getNextTime;
    exports.getContinuousFragments = getContinuousFragments;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _BoxGroup2 = babelHelpers.interopRequireDefault(_BoxGroup);

    var date = babelHelpers.interopRequireWildcard(_util);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file UnitCalendar
     * @author leon(ludafa@outlook.com)
     */

    var cx = (0, _cxBuilder.create)('UnitCalendar');

    /**
     * melon 日期区间选择器
     *
     * @class
     * @extends {melon-core/InputComponent}
     */

    var UnitCalendar = function (_InputComponent) {
        babelHelpers.inherits(UnitCalendar, _InputComponent);

        /**
         * 构造函数
         *
         * @param  {Object} props   组件属性
         * @param  {Object} context 组件上下文
         * @public
         */
        function UnitCalendar(props, context) {
            babelHelpers.classCallCheck(this, UnitCalendar);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            _this.onChange = _this.onChange.bind(_this);
            _this.parse = _this.parse.bind(_this);
            _this.format = _this.format.bind(_this);
            return _this;
        }

        /**
         * BoxGroup 改变时触发
         *
         * @param  {Object} e 事件对象
         * @private
         */


        UnitCalendar.prototype.onChange = function onChange(e) {

            var nextValue = e.value;

            var value = this.state.value;

            _InputComponent.prototype.onChange.call(this, {

                type: 'change',

                target: this,

                // 如果是连续的，这里需要算一下，不是连续的就以新值为主
                value: this.props.continuous ? this.calculate(value, nextValue).map(this.parse) : value
            });
        };

        UnitCalendar.prototype.calculate = function calculate(current, next) {

            current = current.map(this.format).sort();

            next = next.sort();

            var cLength = current.length;
            var nLength = next.length;
            var unit = this.props.unit;

            if (cLength === nLength) {
                return current;
            }

            if (!cLength || !nLength) {
                return next;
            }

            // fill
            if (cLength < nLength) {

                var firtNext = new Date(next[0]);
                var firstCurrent = new Date(current[0]);

                if (firtNext < firstCurrent) {
                    return [].concat(getContinuousFragments(firtNext, firstCurrent, unit).map(this.format), current);
                }

                var lastNext = new Date(next[nLength - 1]);
                lastNext.setDate(lastNext.getDate() + 1);
                var lastCurrent = new Date(current[cLength - 1]);

                return current.concat(getContinuousFragments(lastCurrent, lastNext, unit).slice(1).map(this.format));
            }

            // cut
            for (var i = 0; i < nLength; ++i) {
                if (current[i] < next[i]) {
                    if (i === 0) {
                        return current.slice(1);
                    }
                    return current.slice(0, i);
                }
            }

            return current.slice(0, -1);
        };

        UnitCalendar.prototype.parse = function parse(time) {
            return date.parse(time, this.props.format);
        };

        UnitCalendar.prototype.format = function format(time) {
            return date.format(time, this.props.format);
        };

        UnitCalendar.prototype.parseValue = function parseValue() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

            return value.split(',').map(function (date) {
                return this.parse(date);
            });
        };

        UnitCalendar.prototype.stringifyValue = function stringifyValue() {
            var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return value.map(function (term) {
                return this.format(term);
            }).join(',');
        };

        UnitCalendar.prototype.render = function render() {
            var _this2 = this;

            var _props = this.props,
                begin = _props.begin,
                end = _props.end,
                unit = _props.unit,
                format = _props.format,
                rest = babelHelpers.objectWithoutProperties(_props, ['begin', 'end', 'unit', 'format']);


            var value = this.state.value;

            value = value.map(function (fragment) {
                return date.format(normalize(fragment, unit), format);
            }).sort();

            var options = getContinuousFragments(begin, end, unit).map(function (fragment) {
                var begin = _this2.format(fragment);
                var end = getNextTime(fragment, unit);
                end.setDate(end.getDate() - 1);
                end = _this2.format(end);
                return _react2['default'].createElement('option', { key: begin, value: begin, label: begin + ' ~ ' + end });
            });

            return _react2['default'].createElement(
                'div',
                { className: cx(this.props).build() },
                _react2['default'].createElement(
                    _BoxGroup2['default'],
                    babelHelpers['extends']({}, (0, _omit2['default'])(rest, ['defaultValue']), {
                        boxModel: 'checkbox',
                        onChange: this.onChange,
                        value: value }),
                    options
                )
            );
        };

        return UnitCalendar;
    }(_InputComponent3['default']);

    exports['default'] = UnitCalendar;


    UnitCalendar.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {
        begin: _react.PropTypes.instanceOf(Date),
        end: _react.PropTypes.instanceOf(Date),
        unit: _react.PropTypes.oneOf(['week', 'month', 'year']).isRequired,
        value: _react.PropTypes.arrayOf(Date),
        continuous: _react.PropTypes.bool.isRequired,
        defaultValue: _react.PropTypes.arrayOf(_react.PropTypes.string)
    });

    UnitCalendar.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        continuous: true,
        defaultValue: [],
        format: 'YYYY-MM-DD'
    });

    UnitCalendar.childContextTypes = _InputComponent3['default'].childContextTypes;
    UnitCalendar.contextTypes = _InputComponent3['default'].contextTypes;

    /**
     * 处理时间对象，只留下当前单位需要的部分
     *
     * @param  {Date}   time 时间
     * @param  {string} unit 单位
     * @return {Date}
     */
    function normalize(time, unit) {
        time = new Date(time);
        // 得到周一
        if (unit === 'week') {
            time.setDate(time.getDate() - time.getDay() + 1);
        }
        // 得到1日
        else if (unit === 'month') {
                time.setDate(1);
            }
            // 得到1月1日
            else {
                    time.setMonth(0);
                    time.setDate(1);
                }
        return time;
    }

    /**
     * 处理时间对象，返回当前单位下下一个值
     *
     * @param  {Date}   time 时间
     * @param  {string} unit 单位
     * @return {Date}
     */
    function getNextTime(time, unit) {
        time = normalize(time, unit);
        if (unit === 'week') {
            time.setDate(time.getDate() + 7);
        } else if (unit === 'month') {
            time.setMonth(time.getMonth() + 1);
        } else {
            time.setFullYear(time.getFullYear() + 1);
        }
        return time;
    }

    /**
     * 获取所允许的时间区间
     *
     * @param  {Date} begin   起始时间
     * @param  {Date} end     结束时间
     * @param  {string} unit  单位
     * @return {Array<Date>}
     */
    function getContinuousFragments(begin, end, unit) {

        begin = normalize(begin, unit);

        var result = [];

        while (begin < end) {
            result.push(new Date(begin));
            if (unit === 'week') {
                begin.setDate(begin.getDate() + 7);
            } else if (unit === 'month') {
                begin.setMonth(begin.getMonth() + 1);
            } else {
                begin.setFullYear(begin.getFullYear() + 1);
            }
        }

        return result;
    }
});
//# sourceMappingURL=UnitCalendar.js.map
