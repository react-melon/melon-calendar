(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', 'melon/Icon', 'melon/Confirm', './calendar/Panel', './util', 'lodash/omit', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require('melon/Icon'), require('melon/Confirm'), require('./calendar/Panel'), require('./util'), require('lodash/omit'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.InputComponent, global.cxBuilder, global.Icon, global.Confirm, global.Panel, global.util, global.omit, global.babelHelpers);
        global.Calendar = mod.exports;
    }
})(this, function (exports, _react, _InputComponent2, _cxBuilder, _Icon, _Confirm, _Panel, _util, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Confirm2 = babelHelpers.interopRequireDefault(_Confirm);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    var DateTime = babelHelpers.interopRequireWildcard(_util);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file melon/Calendar
     * @author cxtom<cxtom2008@gmail.com>
     */

    var cx = (0, _cxBuilder.create)('Calendar');

    /**
     * melon 日期选择器
     *
     * @class
     * @extends {melon-core/InputComponent}
     */

    var Calendar = function (_InputComponent) {
        babelHelpers.inherits(Calendar, _InputComponent);

        /**
         * 构造函数
         *
         * @param  {Object} props   组件属性
         * @param  {Object} context 组件上下文
         * @public
         */
        function Calendar(props, context) {
            babelHelpers.classCallCheck(this, Calendar);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);
            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onCancel = _this.onCancel.bind(_this);
            _this.onDateChange = _this.onDateChange.bind(_this);

            var defaultValue = props.defaultValue,
                value = props.value;


            var date = value === void 0 ? defaultValue : value;

            /**
             * 组件状态
             *
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {

                value: _this.stringifyValue(date),

                // 缓存用户在 confirm 前的选中值
                date: date ? _this.parseDate(date) : void 0,

                // 是否打开选择窗
                open: false

            });

            return _this;
        }

        /**
         * react生命周期，组件将更新时触发
         *
         * @param {Object} _ 属性
         * @param {Object} nextState 状态
         */


        Calendar.prototype.componentWillUpdate = function componentWillUpdate(_, nextState) {
            var date = this.parseDate(nextState.value);
            if (this.state.value !== nextState.value && (date === void 0 || nextState.date === void 0 || !DateTime.isEqualDate(date, nextState.date))) {
                this.setState({
                    date: this.parseDate(nextState.value)
                });
            }
        };

        Calendar.prototype.stringifyValue = function stringifyValue(rawValue) {

            if (!DateTime.isDate(rawValue)) {
                return rawValue;
            }

            var dateFormat = this.props.dateFormat;
            return DateTime.format(rawValue, dateFormat);
        };

        Calendar.prototype.parseDate = function parseDate(date) {

            if (typeof date !== 'string') {
                return date;
            }

            var format = this.props.dateFormat;

            return DateTime.parse(date, format);
        };

        Calendar.prototype.onLabelClick = function onLabelClick() {
            this.setState({ open: true });
        };

        Calendar.prototype.onConfirm = function onConfirm() {
            var _this2 = this;

            var _state = this.state,
                value = _state.value,
                date = _state.date;


            value = this.parseDate(value);

            if (value && DateTime.isEqualDate(date, this.parseDate(value))) {
                this.setState({ open: false });
                return;
            }

            var newDate = date ? date : new Date();

            this.setState({ open: false, date: newDate });

            _InputComponent.prototype.onChange.call(this, {
                type: 'change',
                target: this,
                value: this.stringifyValue(newDate)
            }, function () {
                _this2.setState({ open: false, date: newDate });
            });
        };

        Calendar.prototype.onCancel = function onCancel() {
            this.setState({ open: false });
        };

        Calendar.prototype.onDateChange = function onDateChange(e) {
            var _this3 = this;

            var value = this.parseDate(e.value);
            var newState = {
                date: this.parseDate(value)
            };

            if (this.props.autoConfirm) {
                _InputComponent.prototype.onChange.call(this, {
                    type: 'change',
                    target: this,
                    value: this.stringifyValue(value)
                }, function () {
                    _this3.setState(babelHelpers['extends']({}, newState, {
                        open: false
                    }));
                });
            } else {
                this.setState(newState);
            }
        };

        Calendar.prototype.renderHiddenInput = function renderHiddenInput() {
            var _props = this.props,
                name = _props.name,
                value = _props.value;


            return name ? _react2['default'].createElement('input', {
                name: name,
                type: 'hidden',
                value: value }) : null;
        };

        Calendar.prototype.render = function render() {
            var state = this.state,
                props = this.props;
            var lang = props.lang,
                disabled = props.disabled,
                readOnly = props.readOnly,
                size = props.size,
                placeholder = props.placeholder,
                others = babelHelpers.objectWithoutProperties(props, ['lang', 'disabled', 'readOnly', 'size', 'placeholder']);
            var value = state.value,
                open = state.open,
                date = state.date;
            var begin = props.begin,
                end = props.end;


            begin = begin ? this.parseDate(begin) : null;
            end = end ? this.parseDate(end) : null;

            var className = cx(props).addStates({ focus: open }).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, (0, _omit2['default'])(others, ['dateFormat', 'name', 'autoConfirm', 'variants', 'states']), { className: className }),
                this.renderHiddenInput(),
                _react2['default'].createElement(
                    'label',
                    { onClick: disabled || readOnly ? null : this.onLabelClick },
                    value ? value : _react2['default'].createElement(
                        'span',
                        { className: cx().part('label-placeholder').build() },
                        placeholder
                    ),
                    _react2['default'].createElement(_Icon2['default'], { icon: 'expand-more' })
                ),
                _react2['default'].createElement(
                    _Confirm2['default'],
                    {
                        open: open,
                        variants: ['calendar'],
                        onConfirm: this.onConfirm,
                        onCancel: this.onCancel,
                        size: size,
                        buttonVariants: ['secondery', 'calendar'] },
                    _react2['default'].createElement(_Panel2['default'], {
                        date: date,
                        begin: begin,
                        end: end,
                        lang: lang,
                        onChange: this.onDateChange })
                )
            );
        };

        return Calendar;
    }(_InputComponent3['default']);

    exports['default'] = Calendar;


    Calendar.displayName = 'Calendar';

    Calendar.LANG = {

        // 对于 '周' 的称呼
        week: '周',

        // 星期对应的顺序表示
        days: '日,一,二,三,四,五,六'

    };

    Calendar.defaultProps = babelHelpers['extends']({}, _InputComponent3['default'].defaultProps, {
        dateFormat: 'YYYY-MM-DD',
        lang: Calendar.LANG,
        placeholder: '请选择'
    });

    Calendar.propTypes = babelHelpers['extends']({}, _InputComponent3['default'].propTypes, {

        value: _react.PropTypes.string,

        autoConfirm: _react.PropTypes.bool,

        dateFormat: _react.PropTypes.string,

        end: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),

        begin: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),

        lang: _react.PropTypes.shape({
            week: _react.PropTypes.string,
            days: _react.PropTypes.string
        })

    });

    Calendar.childContextTypes = _InputComponent3['default'].childContextTypes;

    Calendar.contextTypes = _InputComponent3['default'].contextTypes;
});
//# sourceMappingURL=Calendar.js.map
