/**
 * @file Calendar/CalendarSelector
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {create} from 'melon-core/classname/cxBuilder';
import Item from './SelectorItem';
import * as DateTime from '../util';
import {range} from 'melon-core/util/array';

const cx = create('CalendarSelector');

/**
 * melon-calendar 年/月选择面板
 *
 * @class
 * @extends {React.Component}
 */
export default class CalendarSelector extends Component {

    /**
     * 构造函数
     *
     * @param  {Object} props   组件属性
     * @public
     */
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /**
     * 组件mount时触发，当前选择的年/月需要在可见范围
     *
     * @public
     */
    componentDidMount = this.autoScroll

    /**
     * 组件更新时触发，当前选择的年/月需要在可见范围
     *
     * @public
     */
    componentDidUpdate = this.autoScroll

    /**
     * 使选择的年/月在可见范围
     *
     * @public
     */
    autoScroll() {
        const item = this.refs.item ? ReactDOM.findDOMNode(this.refs.item) : null;
        item && item.scrollIntoView && item.scrollIntoView();
    }

    /**
     * 点击某月/年时触发
     *
     * @param  {Object} e      事件对象
     * @param  {string} e.mode 年/月
     * @param  {Date}   e.date 日期
     */
    onClick(e) {

        const onChange = this.props.onChange;

        if (onChange) {
            onChange({
                target: this,
                mode: e.mode,
                date: e.date
            });
        }
    }

    /**
     * 是否显示月份
     *
     * @return {boolean}
     * @private
     */
    isMonthView() {

        const {
            minDate,
            maxDate,
            mode
        } = this.props;

        let onlyOneYear = false;

        // 如果范围中只有一年，则跳过yearview，直接显示month view
        if (mode === 'year' && DateTime.isDate(minDate) && DateTime.isDate(maxDate)) {
            onlyOneYear = (DateTime.yearDiff(minDate, maxDate) === 0);
        }

        return mode === 'month' || onlyOneYear;
    }

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        const {
            minDate,
            maxDate,
            date,
            ...rest
        } = this.props;

        let children = [];

        const y = date.getFullYear();
        const m = date.getMonth();
        const d = date.getDate();

        if (this.isMonthView()) {
            children = range(12).map((month, index) => {

                const newDate = new Date(y, month, d);
                const disabled = (DateTime.isDate(minDate) && DateTime.isBeforeMonth(newDate, minDate))
                                || (DateTime.isDate(maxDate) && DateTime.isAfterMonth(newDate, maxDate));
                const selected = month === m;

                return (
                    <Item
                        key={index}
                        mode="month"
                        ref={selected ? 'item' : null}
                        date={newDate}
                        onClick={this.onClick}
                        disabled={disabled}
                        selected={selected} />
                );

            });
        }
        else {

            const maxRange = CalendarSelector.MAX_RANGE;

            range(y - maxRange, y + maxRange).forEach((year, index) => {

                if ((DateTime.isDate(minDate) && year < minDate.getFullYear())
                    || (DateTime.isDate(maxDate) && year > maxDate.getFullYear())) {

                    return;
                }

                const newDate = new Date(year, m, d);
                const selected = year === y;

                children.push(
                    <Item
                        key={index}
                        mode="year"
                        ref={selected ? 'item' : null}
                        date={newDate}
                        onClick={this.onClick}
                        selected={selected} />
                );

            });

        }

        return (
            <ul {...rest} className={cx(this.props).build()}>
                {children}
            </ul>
        );

    }

}

CalendarSelector.displayName = 'CalendarSelector';

CalendarSelector.MAX_RANGE = 10;

CalendarSelector.propTypes = {
    date: PropTypes.object.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onChange: PropTypes.func,
    mode: PropTypes.oneOf(['month', 'year'])
};
