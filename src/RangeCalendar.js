/**
 * @file melon/RangeCalendar
 * @author cxtom <cxtom2008@gmail.com>
 *         leon <ludafa@outlook.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import InputComponent from 'melon-core/InputComponent';

import Icon from 'melon/Icon';
import Confirm from 'melon/Confirm';

import Calendar from './Calendar';
import Panel from './calendar/Panel';
import * as DateTime from './util';
import omit from 'lodash/omit';

const cx = create('RangeCalendar');

/**
 * melon 日期区间选择器
 *
 * @class
 * @extends {melon-core/InputComponent}
 */
export default class RangeCalendar extends InputComponent {

    /**
     * 构造函数
     *
     * @param  {Object} props   组件属性
     * @param  {Object} context 组件上下文
     * @public
     */
    constructor(props, context) {

        super(props, context);

        const {begin, end} = props;

        const value = this.state.value;

        /**
         * 组件状态
         *
         * @type {Object}
         */
        this.state = {
            ...this.state,
            open: false,
            date: this.getNormalizeValue(value, begin, end)
        };

        this.onLabelClick = this.onLabelClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onLabelClick = this.onLabelClick.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    /**
     * 获取过滤后的日期对象区间
     *
     * @param  {Array<string>} value 时间区间值
     * @param  {string|Date}   begin 范围最新值
     * @param  {string|Date}   end   范围最大值
     * @return {Array<Date>}         日期对象区间
     * @private
     */
    getNormalizeValue(value, begin, end) {

        if (value.length === 0) {
            return [new Date(), new Date()];
        }

        begin = this.parseDate(begin);
        end = this.parseDate(end);

        let valueBegin = this.parseDate(value[0]);
        let valueEnd = this.parseDate(value[1]);

        // 这里我们需要一个全新的 value
        value = [
            begin && DateTime.isAfterDate(begin, valueBegin) ? begin : valueBegin,
            end && DateTime.isBeforeDate(end, valueEnd) ? end : valueEnd
        ];

        return value;

    }

    /**
     * 格式化日期区间
     *
     * @param {Array<Date>} date 源日期对象
     * @return {Array<string>} 格式化后的日期字符串
     * @private
     */
    stringifyValue(date) {
        return date.map(date => this.formatDate(date));
    }

    /**
     * 点击 Label 时触发，打开浮层
     *
     * @private
     */
    onLabelClick() {

        const {
            disabled,
            readOnly
        } = this.props;

        if (disabled || readOnly) {
            return;
        }

        this.setState({open: true});
    }

    /**
     * 点击取消时触发
     *
     * @private
     */
    onCancel() {
        this.setState({
            open: false
        });
    }

    /**
     * CalendarPanel 日期变更时触发
     * 当属性 autoConfirm 为 true 时，自动执行 onConfirm
     *
     * @param {number} index   0 - 开始时间改变， 1 - 结束时间改变
     * @param {Object} e       事件对象
     * @param {Date}   e.value 改变后的日期值
     * @private
     */
    onDateChange(index, e) {

        const value = e.value;

        let date = [].concat(this.state.date);

        date[index] = value;

        this.setState({
            date
        });
    }

    /**
     * 在浮层上点击确定按钮时触发
     *
     * @private
     */
    onConfirm() {

        const {date, value} = this.state;

        // 不管怎么样，先把窗口关了
        this.setState({
            open: false
        }, () => {

            // 如果值发生了变化，那么释放一个 change 事件
            if (
                !DateTime.isEqualDate(date[0], this.parseDate(value[0]))
                || !DateTime.isEqualDate(date[1], this.parseDate(value[1]))
            ) {
                super.onChange({
                    type: 'change',
                    target: this,
                    value: date.map(this.formatDate, this)
                });
            }

        });

    }

    /**
     * 按设置格式化日期
     *
     * @param {Date} date 日期
     * @return {string}
     * @private
     */
    formatDate(date) {

        return DateTime.format(
            date,
            this.props.dateFormat
        );
    }

    /**
     * 格式化日期对象
     *
     * @param  {string} date  日期字符串
     * @return {Date}         转化后的日期对象
     * @private
     */
    parseDate(date) {

        if (typeof date !== 'string') {
            return date;
        }

        let format = this.props.dateFormat;

        return DateTime.parse(date, format);
    }

    /**
     * 渲染input
     *
     * @protected
     * @return {ReactElement}
     */
    renderHiddenInput() {

        const {name, value} = this.props;

        return name
            ? (
                <input
                    name={name}
                    type="hidden"
                    value={value.join(',')} />
            )
            : null;

    }

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        const props = this.props;

        let {
            lang,
            disabled,
            readOnly,
            size,
            begin,
            end,
            placeholder,
            ...others
        } = props;

        const {open, date, value} = this.state;

        begin = begin ? this.parseDate(begin) : null;
        end = end ? this.parseDate(end) : null;

        const className = cx(props)
            .addStates({focus: open})
            .addStates(this.getStyleStates())
            .build();

        return (
            <div
                {...omit(others, ['dateFormat', 'name', 'autoConfirm', 'variants', 'states'])}
                className={className}>
                {this.renderHiddenInput()}
                <label onClick={(disabled || readOnly) ? null : this.onLabelClick}>
                    {value.length === 0
                        ? (
                            <span className={cx().part('label-placeholder').build()}>
                                {placeholder}
                            </span>
                        ) : `${value[0]} 至 ${value[1]}`
                    }
                    <Icon icon='expand-more' />
                </label>
                <Confirm
                    open={open}
                    variants={['calendar', 'range']}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    size={size}
                    buttonVariants={['secondery', 'calendar']} >
                    <div className={cx().part('row').build()}>
                        <Panel
                            lang={lang}
                            date={date[0]}
                            begin={begin}
                            end={date[1] || new Date()}
                            onChange={this.onDateChange.bind(this, 0)} />
                        <Panel
                            lang={lang}
                            date={date[1]}
                            begin={date[0] || new Date()}
                            end={end}
                            onChange={this.onDateChange.bind(this, 1)} />
                    </div>
                </Confirm>
            </div>
        );

    }

}

RangeCalendar.displayName = 'RangeCalendar';

RangeCalendar.defaultProps = {
    ...Calendar.defaultProps,
    defaultValue: [],
    placeholder: '请选择'
};

RangeCalendar.propTypes = {
    ...Calendar.propTypes,
    defaultValue: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.arrayOf(PropTypes.string),
    autoOk: PropTypes.bool,
    dateFormat: PropTypes.string,
    begin: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    end: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ])
};

RangeCalendar.childContextTypes = InputComponent.childContextTypes;

RangeCalendar.contextTypes = InputComponent.contextTypes;
