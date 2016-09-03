/**
 * @file UnitCalendar
 * @author leon(ludafa@outlook.com)
 */

import React, {PropTypes} from 'react';

import {create} from 'melon-core/classname/cxBuilder';
import InputComponent from 'melon-core/InputComponent';

import BoxGroup from 'melon/BoxGroup';
import * as date from './util';

const cx = create('UnitCalendar');

/**
 * melon 日期区间选择器
 *
 * @class
 * @extends {melon-core/InputComponent}
 */
export default class UnitCalendar extends InputComponent {

    /**
     * 构造函数
     *
     * @param  {Object} props   组件属性
     * @param  {Object} context 组件上下文
     * @public
     */
    constructor(props, context) {
        super(props, context);
        this.onChange = this.onChange.bind(this);
        this.parse = this.parse.bind(this);
        this.format = this.format.bind(this);
    }

    /**
     * BoxGroup 改变时触发
     *
     * @param  {Object} e 事件对象
     * @private
     */
    onChange(e) {

        const nextValue = e.value;

        const value = this.state.value;

        super.onChange({

            target: this,

            // 如果是连续的，这里需要算一下，不是连续的就以新值为主
            value: this.props.continuous
                ? this.calculate(value, nextValue).map(this.parse)
                : value
        });

    }

    /**
     * 时间区间的计算
     *
     * @param  {Array<Date>}  current 当前区间
     * @param  {Array<Date>}  next    改变后的区间
     * @return {Array<string>}
     */
    calculate(current, next) {

        current = current.map(this.format).sort();

        next = next.sort();

        let cLength = current.length;
        let nLength = next.length;
        let unit = this.props.unit;

        if (cLength === nLength) {
            return current;
        }

        if (!cLength || !nLength) {
            return next;
        }

        // fill
        if (cLength < nLength) {

            let firtNext = new Date(next[0]);
            let firstCurrent = new Date(current[0]);

            if (firtNext < firstCurrent) {
                return getContinuousFragments(firtNext, firstCurrent, unit).map(this.format).concat(current);
            }

            let lastNext = new Date(next[nLength - 1]);
            lastNext.setDate(lastNext.getDate() + 1);
            let lastCurrent = new Date(current[cLength - 1]);

            return current.concat(getContinuousFragments(lastCurrent, lastNext, unit).slice(1).map(this.format));

        }

        // cut
        for (let i = 0; i < nLength; ++i) {
            if (current[i] < next[i]) {
                if (i === 0) {
                    return current.slice(1);
                }
                return current.slice(0, i);
            }
        }

        return current.slice(0, -1);

    }

    /**
     * 日期字符串格式化
     *
     * @param  {string} time 日期字符串
     * @return {Date}
     */
    parse(time) {
        return date.parse(time, this.props.format);
    }

    /**
     * 日期对象格式化
     *
     * @param  {Date} time 日期对象
     * @return {string}
     */
    format(time) {
        return date.format(time, this.props.format);
    }

    /**
     * 日期区间格式转换
     *
     * @param  {string} value 日期区间字符串
     * @return {Array<Date>}
     */
    parseValue(value = '') {
        return value
            .split(',')
            .map(function (date) {
                return this.parse(date);
            });
    }

    /**
     * 日期区间格式转换
     *
     * @param  {Array<Date>} value 日期区间数组
     * @return {string}
     */
    stringifyValue(value = []) {
        return value
            .map(function (term) {
                return this.format(term);
            })
            .join(',');
    }

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        let {begin, end, unit, format, ...rest} = this.props;

        let value = this.state.value;

        value = value
            .map(function (fragment) {
                return date.format(normalize(fragment, unit), format);
            })
            .sort();

        const options = getContinuousFragments(begin, end, unit).map(fragment => {
            let begin = this.format(fragment);
            let end = getNextTime(fragment, unit);
            end.setDate(end.getDate() - 1);
            end = this.format(end);
            return (<option key={begin} value={begin} label={`${begin} ~ ${end}`} />);
        });

        return (
            <div className={cx(this.props).build()}>
                <BoxGroup
                    {...rest}
                    boxModel="checkbox"
                    onChange={this.onChange}
                    value={value}>
                    {options}
                </BoxGroup>
            </div>
        );

    }


}

UnitCalendar.propTypes = {
    ...InputComponent.propTypes,
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date),
    unit: PropTypes.oneOf(['week', 'month', 'year']).isRequired,
    value: PropTypes.arrayOf(Date),
    continuous: PropTypes.bool.isRequired,
    defaultValue: PropTypes.arrayOf(PropTypes.string)
};

UnitCalendar.defaultProps = {
    ...InputComponent.defaultProps,
    continuous: true,
    defaultValue: [],
    format: 'YYYY-MM-DD'
};

UnitCalendar.childContextTypes = InputComponent.childContextTypes;
UnitCalendar.contextTypes = InputComponent.contextTypes;


/**
 * 处理时间对象，只留下当前单位需要的部分
 *
 * @param  {Date}   time 时间
 * @param  {string} unit 单位
 * @return {Date}
 */
export function normalize(time, unit) {
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
export function getNextTime(time, unit) {
    time = normalize(time, unit);
    if (unit === 'week') {
        time.setDate(time.getDate() + 7);
    }
    else if (unit === 'month') {
        time.setMonth(time.getMonth() + 1);
    }
    else {
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
export function getContinuousFragments(begin, end, unit) {

    begin = normalize(begin, unit);

    let result = [];

    while (begin < end) {
        result.push(new Date(begin));
        if (unit === 'week') {
            begin.setDate(begin.getDate() + 7);
        }
        else if (unit === 'month') {
            begin.setMonth(begin.getMonth() + 1);
        }
        else {
            begin.setFullYear(begin.getFullYear() + 1);
        }
    }

    return result;

}
