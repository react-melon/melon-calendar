(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'melon-core/Validity', 'melon-core/classname/cxBuilder', 'melon-core/InputComponent', 'melon-core/util/syncPropsToState', 'melon/Icon', 'melon/Confirm', './Calendar', './calendar/Panel', './util', 'lodash/omit', './babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('melon-core/Validity'), require('melon-core/classname/cxBuilder'), require('melon-core/InputComponent'), require('melon-core/util/syncPropsToState'), require('melon/Icon'), require('melon/Confirm'), require('./Calendar'), require('./calendar/Panel'), require('./util'), require('lodash/omit'), require('./babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.Validity, global.cxBuilder, global.InputComponent, global.syncPropsToState, global.Icon, global.Confirm, global.Calendar, global.Panel, global.util, global.omit, global.babelHelpers);
        global.RangeCalendar = mod.exports;
    }
})(this, function (exports, _react, _Validity, _cxBuilder, _InputComponent2, _syncPropsToState, _Icon, _Confirm, _Calendar, _Panel, _util, _omit, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var _react2 = babelHelpers.interopRequireDefault(_react);

    var _Validity2 = babelHelpers.interopRequireDefault(_Validity);

    var _InputComponent3 = babelHelpers.interopRequireDefault(_InputComponent2);

    var _Icon2 = babelHelpers.interopRequireDefault(_Icon);

    var _Confirm2 = babelHelpers.interopRequireDefault(_Confirm);

    var _Calendar2 = babelHelpers.interopRequireDefault(_Calendar);

    var _Panel2 = babelHelpers.interopRequireDefault(_Panel);

    var DateTime = babelHelpers.interopRequireWildcard(_util);

    var _omit2 = babelHelpers.interopRequireDefault(_omit);

    /**
     * @file melon/RangeCalendar
     * @author cxtom <cxtom2008@gmail.com>
     *         leon <ludafa@outlook.com>
     */

    var cx = (0, _cxBuilder.create)('RangeCalendar');

    /**
     * melon 日期区间选择器
     *
     * @class
     * @extends {melon-core/InputComponent}
     */

    var RangeCalendar = function (_InputComponent) {
        babelHelpers.inherits(RangeCalendar, _InputComponent);

        /**
         * 构造函数
         *
         * @param  {Object} props   组件属性
         * @param  {Object} context 组件上下文
         * @public
         */
        function RangeCalendar(props, context) {
            babelHelpers.classCallCheck(this, RangeCalendar);

            var _this = babelHelpers.possibleConstructorReturn(this, _InputComponent.call(this, props, context));

            var begin = props.begin,
                end = props.end;


            var value = _this.state.value;

            /**
             * 组件状态
             *
             * @type {Object}
             */
            _this.state = babelHelpers['extends']({}, _this.state, {
                open: false,
                date: _this.getNormalizeValue(value, begin, end)
            });

            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onConfirm = _this.onConfirm.bind(_this);
            _this.onLabelClick = _this.onLabelClick.bind(_this);
            _this.onCancel = _this.onCancel.bind(_this);
            _this.onDateChange = _this.onDateChange.bind(_this);
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


        RangeCalendar.prototype.getSyncUpdates = function getSyncUpdates(nextProps) {
            var disabled = nextProps.disabled,
                customValidity = nextProps.customValidity,
                readOnly = nextProps.readOnly,
                _nextProps$value = nextProps.value,
                value = _nextProps$value === undefined ? nextProps.defaultValue : _nextProps$value,
                begin = nextProps.begin,
                end = nextProps.end;


            // 如果有值，那么就试着解析一下；否则设置为 null
            var date = value ? this.getNormalizeValue(value, begin, end) : null;

            var vilidity = (0, _syncPropsToState.getNextValidity)(this, { value: value, disabled: disabled, customValidity: customValidity });

            return {
                date: date,
                vilidity: vilidity,
                value: disabled || readOnly || !value.length ? value : this.stringifyValue(date)
            };
        };

        RangeCalendar.prototype.getNormalizeValue = function getNormalizeValue(value, begin, end) {

            if (value.length === 0) {
                return [new Date(), new Date()];
            }

            begin = this.parseDate(begin);
            end = this.parseDate(end);

            var valueBegin = this.parseDate(value[0]);
            var valueEnd = this.parseDate(value[1]);

            // 这里我们需要一个全新的 value
            value = [begin && DateTime.isAfterDate(begin, valueBegin) ? begin : valueBegin, end && DateTime.isBeforeDate(end, valueEnd) ? end : valueEnd];

            return value;
        };

        RangeCalendar.prototype.stringifyValue = function stringifyValue(date) {
            var _this2 = this;

            return date.map(function (date) {
                return _this2.formatDate(date);
            });
        };

        RangeCalendar.prototype.onLabelClick = function onLabelClick() {
            var _props = this.props,
                disabled = _props.disabled,
                readOnly = _props.readOnly;


            if (disabled || readOnly) {
                return;
            }

            this.setState({ open: true });
        };

        RangeCalendar.prototype.onCancel = function onCancel() {
            this.setState({
                open: false
            });
        };

        RangeCalendar.prototype.onDateChange = function onDateChange(index, e) {

            var value = e.value;

            var date = [].concat(this.state.date);

            date[index] = value;

            this.setState({
                date: date
            });
        };

        RangeCalendar.prototype.onConfirm = function onConfirm() {
            var _this3 = this;

            var _state = this.state,
                date = _state.date,
                value = _state.value;


            // 不管怎么样，先把窗口关了
            this.setState({
                open: false
            }, function () {

                // 如果值发生了变化，那么释放一个 change 事件
                if (!DateTime.isEqualDate(date[0], _this3.parseDate(value[0])) || !DateTime.isEqualDate(date[1], _this3.parseDate(value[1]))) {
                    _InputComponent.prototype.onChange.call(_this3, {
                        type: 'change',
                        target: _this3,
                        value: date.map(_this3.formatDate, _this3)
                    });
                }
            });
        };

        RangeCalendar.prototype.formatDate = function formatDate(date) {

            return DateTime.format(date, this.props.dateFormat);
        };

        RangeCalendar.prototype.parseDate = function parseDate(date) {

            if (typeof date !== 'string') {
                return date;
            }

            var format = this.props.dateFormat;

            return DateTime.parse(date, format);
        };

        RangeCalendar.prototype.renderHiddenInput = function renderHiddenInput() {
            var _props2 = this.props,
                name = _props2.name,
                value = _props2.value;


            return name ? _react2['default'].createElement('input', {
                name: name,
                type: 'hidden',
                value: value.join(',') }) : null;
        };

        RangeCalendar.prototype.render = function render() {

            var props = this.props;

            var lang = props.lang,
                disabled = props.disabled,
                readOnly = props.readOnly,
                size = props.size,
                begin = props.begin,
                end = props.end,
                placeholder = props.placeholder,
                others = babelHelpers.objectWithoutProperties(props, ['lang', 'disabled', 'readOnly', 'size', 'begin', 'end', 'placeholder']);
            var _state2 = this.state,
                open = _state2.open,
                date = _state2.date,
                value = _state2.value,
                validity = _state2.validity;


            begin = begin ? this.parseDate(begin) : null;
            end = end ? this.parseDate(end) : null;

            var className = cx(props).addStates({ focus: open }).addStates(this.getStyleStates()).build();

            return _react2['default'].createElement(
                'div',
                babelHelpers['extends']({}, (0, _omit2['default'])(others, ['dateFormat', 'name', 'autoConfirm', 'variants']), {
                    className: className }),
                this.renderHiddenInput(),
                _react2['default'].createElement(
                    'label',
                    { onClick: disabled || readOnly ? null : this.onLabelClick },
                    value.length === 0 ? _react2['default'].createElement(
                        'span',
                        { className: cx().part('label-placeholder').build() },
                        placeholder
                    ) : value[0] + ' \u81F3 ' + value[1],
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
                    _react2['default'].createElement(
                        'div',
                        { className: cx().part('row').build() },
                        _react2['default'].createElement(_Panel2['default'], {
                            lang: lang,
                            date: date[0],
                            begin: begin,
                            end: date[1] || new Date(),
                            onChange: this.onDateChange.bind(this, 0) }),
                        _react2['default'].createElement(_Panel2['default'], {
                            lang: lang,
                            date: date[1],
                            begin: date[0] || new Date(),
                            end: end,
                            onChange: this.onDateChange.bind(this, 1) })
                    )
                )
            );
        };

        return RangeCalendar;
    }(_InputComponent3['default']);

    exports['default'] = RangeCalendar;


    RangeCalendar.displayName = 'RangeCalendar';

    RangeCalendar.defaultProps = babelHelpers['extends']({}, _Calendar2['default'].defaultProps, {
        defaultValue: [],
        placeholder: '请选择'
    });

    RangeCalendar.propTypes = babelHelpers['extends']({}, _Calendar2['default'].propTypes, {
        defaultValue: _react.PropTypes.arrayOf(_react.PropTypes.string),
        autoOk: _react.PropTypes.bool,
        dateFormat: _react.PropTypes.string,
        begin: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string]),
        end: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.string])
    });

    RangeCalendar.childContextTypes = _InputComponent3['default'].childContextTypes;

    RangeCalendar.contextTypes = _InputComponent3['default'].contextTypes;
});
//# sourceMappingURL=RangeCalendar.js.map
