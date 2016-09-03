(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/InputComponent', 'melon-core/classname/cxBuilder', 'melon-core/Validity', 'melon-core/util/syncPropsToState', 'melon/Icon', 'melon/Confirm', './calendar/Panel', './util', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/InputComponent'), require('melon-core/classname/cxBuilder'), require('melon-core/Validity'), require('melon-core/util/syncPropsToState'), require('melon/Icon'), require('melon/Confirm'), require('./calendar/Panel'), require('./util'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.InputComponent, global.cxBuilder, global.Validity, global.syncPropsToState, global.Icon, global.Confirm, global.Panel, global.util, global.babelHelpers);
        global.Calendar = mod.exports;
    }
})(this, function (exports, _react, _InputComponent2, _cxBuilder, _Validity, _syncPropsToState, _Icon, _Confirm, _Panel, _util, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Confirm2 = babelHelpers.interopRequireDefault(_Confirm);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    var DateTime = babelHelpers.interopRequireWildcard(_util);
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

            var value = _this.state.value;

            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);
            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onCancel = _this.onCancel.bind(_this);
            _this.onDateChange = _this.onDateChange.bind(_this);

            /**
             * 组件状态
             *
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {

                // 缓存用户在 confirm 前的选中值
                date: value ? _this.parseDate(value) : undefined,

                // 是否打开选择窗
                open: false

            });

            return _this;
        }

        /**
         * 组件每次更新 (componentWillRecieveProps) 时，需要
         * 更新组件状态，包括校验信息、同步 date 和 value
         *
         * @param  {Object} nextProps 组件更新的属性
         * @return {Object}           最新的组件状态
         * @public
         */


        Calendar.prototype.getSyncUpdates = function getSyncUpdates(nextProps) {
            var disabled = nextProps.disabled;
            var readOnly = nextProps.readOnly;
            var customValidity = nextProps.customValidity;
            var defaultValue = nextProps.defaultValue;


            var value = nextProps.value ? nextProps.value : defaultValue;

            // 如果有值，那么就试着解析一下；否则设置为 null
            var date = value ? this.parseDate(value) : null;

            // 如果 date 为 null 或者是 invalid date，那么就用上默认值；
            // 否则就用解析出来的这个值
            date = !date || isNaN(date.getTime()) ? new Date() : date;

            var vilidity = (0, _syncPropsToState.getNextValidity)(this, { value: value, disabled: disabled, customValidity: customValidity });

            return {
                date: date,
                vilidity: vilidity,
                value: disabled || readOnly || !value ? value : this.stringifyValue(date)
            };
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
            var _props = this.props;
            var disabled = _props.disabled;
            var readOnly = _props.readOnly;


            if (disabled || readOnly) {
                return;
            }

            this.setState({ open: true });
        };

        Calendar.prototype.onConfirm = function onConfirm() {
            var _this2 = this;

            var _state = this.state;
            var value = _state.value;
            var date = _state.date;


            value = this.parseDate(value);

            if (value && DateTime.isEqualDate(date, this.parseDate(value))) {
                this.setState({ open: false });
                return;
            }

            var newDate = date ? date : new Date();

            this.setState({ open: false, date: newDate }, function () {

                _InputComponent.prototype.onChange.call(_this2, {
                    type: 'change',
                    target: _this2,
                    value: _this2.stringifyValue(newDate)
                });
            });
        };

        Calendar.prototype.onCancel = function onCancel() {
            this.setState({ open: false });
        };

        Calendar.prototype.onDateChange = function onDateChange(e) {
            var _this3 = this;

            var value = e.value;

            this.setState({ date: this.parseDate(value) }, this.props.autoConfirm ? function () {
                return _this3.onConfirm();
            } : null);
        };

        Calendar.prototype.render = function render() {
            var state = this.state;
            var props = this.props;
            var lang = props.lang;
            var disabled = props.disabled;
            var readOnly = props.readOnly;
            var size = props.size;
            var name = props.name;
            var placeholder = props.placeholder;
            var others = babelHelpers.objectWithoutProperties(props, ['lang', 'disabled', 'readOnly', 'size', 'name', 'placeholder']);
            var value = state.value;
            var validity = state.validity;
            var begin = props.begin;
            var end = props.end;


            begin = begin ? this.parseDate(begin) : null;
            end = end ? this.parseDate(end) : null;

            var open = state.open;
            var date = state.date;

            var className = cx(props).addStates({ focus: open }).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, others, { className: className }),
                _react2['default'].createElement('input', {
                    name: name,
                    ref: 'input',
                    type: 'hidden',
                    value: value,
                    disabled: disabled,
                    size: size }),
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
                _react2['default'].createElement(_Validity2['default'], { validity: validity }),
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
        defaultValue: '',
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
