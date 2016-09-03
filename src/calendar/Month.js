/**
 * @file CalendarMonth
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component, PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import Day from './Day';
import * as DateTime from '../util';

const cx = create('CalendarMonth');

/**
 * melon-calendar 日期选择面板
 *
 * @class
 * @extends {React.Component}
 */
export default class CalendarMonth extends Component {

    /**
     * 构造函数
     *
     * @param  {Object} props   组件属性
     * @public
     */
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
        this.renderWeek = this.renderWeek.bind(this);
        this.renderDay = this.renderDay.bind(this);
    }

    /**
     * 点击某一天的按钮时触发
     *
     * @param  {Object} e 事件对象
     */
    onClick(e) {
        const onChange = this.props.onChange;
        if (onChange) {
            onChange({
                target: this,
                date: e.date
            });
        }
    }

    /**
     * 星期头渲染
     *
     * @return {React.Element}
     */
    renderWeekHeader() {
        const days = this.props.lang.days.split(',');

        return (
            <div className={cx.getPartClassName('weekheader')}>
                {days.map(function (day, index) {
                    return <span key={index}>{day}</span>;
                })}
            </div>
        );
    }

    /**
     * 一个月
     *
     * @return {React.Element}
     */
    renderDates() {

        const month = this.props.month;

        const weekArray = DateTime.getFullWeekArray(month);

        return (<ul>{weekArray.map(this.renderWeek)}</ul>);
    }

    /**
     * 渲染一周
     *
     * @param  {Array<Date>} week  一周的日期数组
     * @param  {number}      index 索引
     * @return {React.Element}
     */
    renderWeek(week, index) {

        return (
            <li key={index} className={cx().part('week').build()}>
                {week.map(this.renderDay)}
            </li>
        );
    }

    /**
     * 渲染一天
     *
     * @param  {Date} day    日期
     * @param  {number}      index 索引
     * @return {React.Element}
     */
    renderDay(day, index) {

        const {
            date,
            minDate,
            maxDate
        } = this.props;

        const selected = DateTime.isEqualDate(day.date, date);
        const disabled = (DateTime.isDate(minDate) && DateTime.isBeforeDate(day.date, minDate))
                        || (DateTime.isDate(maxDate) && DateTime.isAfterDate(day.date, maxDate));

        return (
            <Day
                key={day.date}
                date={day.date}
                variants={day.variants}
                disabled={disabled}
                selected={selected}
                onClick={this.onClick} />
        );

    }

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        return (
            <div className={cx(this.props).build()}>
                {this.renderWeekHeader()}
                {this.renderDates()}
            </div>
        );
    }

}

CalendarMonth.displayName = 'CalendarMonth';

CalendarMonth.propTypes = {
    date: PropTypes.object.isRequired,
    month: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func,
    lang: PropTypes.shape({
        week: PropTypes.string,
        days: PropTypes.string
    }).isRequired
};
