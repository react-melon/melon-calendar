/**
 * @file melon/Calendar
 * @author cxtom<cxtom2008@gmail.com>
 */

import React, {PropTypes} from 'react';

import InputComponent from 'melon-core/InputComponent';
import {create} from 'melon-core/classname/cxBuilder';
import Validity from 'melon-core/Validity';
import {getNextValidity} from 'melon-core/util/syncPropsToState';

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

        const value = this.state.value;

        this.onLabelClick = this.onLabelClick.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
        this.onLabelClick = this.onLabelClick.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

        /**
         * 组件状态
         *
         * @type {Object}
         */
        this.state = {

            ...this.state,

            // 缓存用户在 confirm 前的选中值
            date: value ? this.parseDate(value) : undefined,

            // 是否打开选择窗
            open: false

        };

    }

    /**
     * 组件每次更新 (componentWillRecieveProps) 时，需要
     * 更新组件状态，包括校验信息、同步 date 和 value
     *
     * @param  {Object} nextProps 组件更新的属性
     * @return {Object}           最新的组件状态
     * @public
     */
    getSyncUpdates(nextProps) {

        const {disabled, readOnly, customValidity, defaultValue} = nextProps;

        let value = nextProps.value ? nextProps.value : defaultValue;

        // 如果有值，那么就试着解析一下；否则设置为 null
        let date = value ? this.parseDate(value) : null;

        // 如果 date 为 null 或者是 invalid date，那么就用上默认值；
        // 否则就用解析出来的这个值
        date = !date || isNaN(date.getTime()) ? new Date() : date;

        const vilidity = getNextValidity(this, {value, disabled, customValidity});

        return {
            date,
            vilidity,
            value: (disabled || readOnly || !value) ? value : this.stringifyValue(date)
        };
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

        const {disabled, readOnly} = this.props;

        if (disabled || readOnly) {
            return;
        }

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

        this.setState({open: false, date: newDate}, () => {

            super.onChange({
                type: 'change',
                target: this,
                value: this.stringifyValue(newDate)
            });

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

        const value = e.value;

        this.setState(
            {date: this.parseDate(value)},
            this.props.autoConfirm ? () => this.onConfirm() : null
        );
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

        const {value, validity} = state;

        let {begin, end} = props;

        begin = begin ? this.parseDate(begin) : null;
        end = end ? this.parseDate(end) : null;

        const {open, date} = state;
        const className = cx(props)
            .addStates({focus: open})
            .addStates(this.getStyleStates())
            .build();

        return (
            <div {...omit(others, ['dateFormat', 'name', 'autoConfirm'])} className={className}>
                {this.renderHiddenInput()}
                <label onClick={(disabled || readOnly) ? null : this.onLabelClick}>
                    {value ? value : (
                        <span className={cx().part('label-placeholder').build()}>
                            {placeholder}
                        </span>
                    )}
                    <Icon icon='expand-more' />
                </label>
                <Validity validity={validity} />
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
