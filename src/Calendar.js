/**
 * @file melon/Calendar
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';

import InputComponent from 'melon-core/InputComponent';
import {create} from 'melon-core/classname/cxBuilder';

import Icon from 'melon/Icon';
import Confirm from 'melon/Confirm';

import Panel from './calendar/Panel';
import * as DateTime from './util';
import omit from 'lodash/omit';

const cx = create('Calendar');


/**
 * melon 日期选择器
 *
 * @class
 * @extends {melon-core/InputComponent}
 */
export default class Calendar extends InputComponent {

    /**
     * 构造函数
     *
     * @param  {Object} props   组件属性
     * @param  {Object} context 组件上下文
     * @public
     */
    constructor(props, context) {

        super(props, context);

        this.onLabelClick = this.onLabelClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onLabelClick = this.onLabelClick.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

        const {defaultValue, value} = props;

        const date = value === void 0 ? defaultValue : value;

        /**
         * 组件状态
         *
         * @type {Object}
         */
        this.state = {

            ...this.state,

            value: this.stringifyValue(date),

            // 缓存用户在 confirm 前的选中值
            date: date ? this.parseDate(date) : void 0,

            // 是否打开选择窗
            open: false

        };

    }

    /**
     * react生命周期，组件将更新时触发
     *
     * @param {Object} _ 属性
     * @param {Object} nextState 状态
     */
    componentWillUpdate(_, nextState) {
        const date = this.parseDate(nextState.value);
        if (this.state.value !== nextState.value && (
            date === void 0 || nextState.date === void 0 || !DateTime.isEqualDate(date, nextState.date)
        )) {
            this.setState({
                date: this.parseDate(nextState.value)
            });
        }
    }

    /**
     * 格式化日期
     *
     * @param {Date} rawValue 源日期对象
     * @param {string=} format 日期格式，默认为当前实例的dateFormat
     * @return {string} 格式化后的日期字符串
     * @private
     */
    stringifyValue(rawValue) {

        if (!DateTime.isDate(rawValue)) {
            return rawValue;
        }

        const dateFormat = this.props.dateFormat;
        return DateTime.format(rawValue, dateFormat);
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
     * 点击 Label 时触发，打开弹窗
     *
     * @private
     */
    onLabelClick() {
        this.setState({open: true});
    }

    /**
     * 在浮层上点击确定按钮时触发
     *
     * @private
     */
    onConfirm() {

        let {value, date} = this.state;

        value = this.parseDate(value);

        if (value && DateTime.isEqualDate(date, this.parseDate(value))) {
            this.setState({open: false});
            return;
        }

        const newDate = date ? date : new Date();

        this.setState({open: false, date: newDate});

        super.onChange({
            type: 'change',
            target: this,
            value: this.stringifyValue(newDate)
        }, () => {
            this.setState({open: false, date: newDate});
        });

    }

    /**
     * 在浮层上点击取消按钮时触发
     *
     * @private
     */
    onCancel() {
        this.setState({open: false});
    }

    /**
     * CalendarPanel 日期变更时触发
     * 当属性 autoConfirm 为 true 时，自动执行 onConfirm
     *
     * @param {Object} e 事件对象
     * @param {Date}   e.value 改变后的日期值
     * @private
     */
    onDateChange(e) {

        const value = this.parseDate(e.value);
        const newState = {
            date: this.parseDate(value)
        };

        if (this.props.autoConfirm) {
            super.onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(value)
            }, () => {
                this.setState({
                    ...newState,
                    open: false
                });
            });
        }
        else {
            this.setState(newState);
        }
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
                    value={value} />
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

        const {
            state,
            props
        } = this;

        const {
            lang,
            disabled,
            readOnly,
            size,
            placeholder,
            ...others
        } = props;

        const {value, open, date} = state;

        let {begin, end} = props;

        begin = begin ? this.parseDate(begin) : null;
        end = end ? this.parseDate(end) : null;

        const className = cx(props)
            .addStates({focus: open})
            .addStates(this.getStyleStates())
            .build();

        return (
            <div {...omit(others, ['dateFormat', 'name', 'autoConfirm', 'variants', 'states'])} className={className}>
                {this.renderHiddenInput()}
                <label onClick={(disabled || readOnly) ? null : this.onLabelClick}>
                    {value ? value : (
                        <span className={cx().part('label-placeholder').build()}>
                            {placeholder}
                        </span>
                    )}
                    <Icon icon='expand-more' />
                </label>
                <Confirm
                    open={open}
                    variants={['calendar']}
                    onConfirm={this.onConfirm}
                    onCancel={this.onCancel}
                    size={size}
                    buttonVariants={['secondery', 'calendar']} >
                    <Panel
                        date={date}
                        begin={begin}
                        end={end}
                        lang={lang}
                        onChange={this.onDateChange} />
                </Confirm>
            </div>
        );

    }

}

Calendar.displayName = 'Calendar';

Calendar.LANG = {

    // 对于 '周' 的称呼
    week: '周',

    // 星期对应的顺序表示
    days: '日,一,二,三,四,五,六'

};

Calendar.defaultProps = {
    ...InputComponent.defaultProps,
    dateFormat: 'YYYY-MM-DD',
    lang: Calendar.LANG,
    placeholder: '请选择'
};

Calendar.propTypes = {

    ...InputComponent.propTypes,

    value: PropTypes.string,

    autoConfirm: PropTypes.bool,

    dateFormat: PropTypes.string,

    end: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),

    begin: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),

    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string
    })

};

Calendar.childContextTypes = InputComponent.childContextTypes;

Calendar.contextTypes = InputComponent.contextTypes;
