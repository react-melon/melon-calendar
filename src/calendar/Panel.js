/**
 * @file melon/CalendarPanel
 * @author leon(ludafa@outlook.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';

import Header from './Header';
import Selector from './Selector';
import Pager from './Pager';
import Month from './Month';

import * as DateTime from '../util';

const cx = create('CalendarPanel');

/**
 * melon-calendar 日期选择主面板
 *
 * @class
 * @extends {React.Component}
 */
export default class CalendarPanel extends Component {

    /**
     * 构造函数
     *
     * @param  {Object} props   组件属性
     * @public
     */
    constructor(props) {

        super(props);

        this.onHeaderClick = this.onHeaderClick.bind(this);
        this.onSelectorChange = this.onSelectorChange.bind(this);
        this.onPagerChange = this.onPagerChange.bind(this);
        this.onDateChange = this.onDateChange.bind(this);

        // 除年月日以外的时间数据清0
        const d = props.date;
        const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());

        /**
         * 组件状态
         *
         * @type {Object}
         */
        this.state = {
            selectorType: 'main',
            month: date,
            date
        };

    }

    /**
     * 组件每次更新属性时判断是否需要同步状态
     *
     * @param  {Object} nextProps 新属性
     * @public
     */
    componentWillReceiveProps(nextProps) {

        const date = nextProps.date;

        if (!DateTime.isEqualDate(date, this.props.date)) {
            this.setState({
                date,
                month: date
            });
        }
    }

    /**
     * 判断是否需要更新，性能优化
     *
     * @param  {Object} nextProps  组件新的属性
     * @param  {Object} nextState  组件新的状态
     * @return {bool}  是否需要更新
     * @public
     */
    shouldComponentUpdate(nextProps, nextState) {
        return !DateTime.isEqualDate(nextState.date, this.state.date)
            || !DateTime.isEqualMonth(nextState.month, this.state.month)
            || nextState.selectorType !== this.state.selectorType
            || (nextProps.begin && this.props.begin && !DateTime.isEqualDate(nextProps.begin, this.props.begin))
            || (nextProps.end && this.props.end && !DateTime.isEqualDate(nextProps.end, this.props.end))
            || (!nextProps.begin && this.props.begin)
            || (!nextProps.end && this.props.end)
            || (nextProps.begin && !this.props.begin)
            || (nextProps.end && !this.props.end);
    }

    /**
     * 点击 Header 切换日期、年/月选择
     *
     * @param  {Object} e 事件对象
     * @protected
     */
    onHeaderClick(e) {

        const selectorType = this.state.selectorType;

        this.setState({
            selectorType: selectorType === 'main' ? 'year' : 'main'
        });
    }

    /**
     * 年/月选择改变的事件
     *
     * @param  {Object} e 事件对象
     * @protected
     */
    onSelectorChange(e) {

        let {
            mode,
            date
        } = e;

        const {
            end,
            begin
        } = this.props;

        mode = mode === 'year' ? 'month' : 'main';

        if (begin && DateTime.isBeforeDate(date, begin)) {
            date = begin;
        }
        else if (end && DateTime.isAfterDate(date, end)) {
            date = end;
        }

        this.setState({
            date: date,
            month: date,
            selectorType: mode
        });

    }

    /**
     * 月份翻页器改变
     *
     * @param  {Object} e 事件对象
     * @protected
     */
    onPagerChange(e) {
        this.setState({month: e.month});
    }

    /**
     * 选择某一天时触发
     *
     * @param  {Object} e 事件对象
     */
    onDateChange(e) {

        const date = e.date;

        const month = this.state.month;
        const monthDiff = DateTime.monthDiff(date, month);

        if (monthDiff !== 0) {
            this.setState({
                month: DateTime.addMonths(month, monthDiff)
            });
        }

        this.props.onChange({
            value: date
        });
    }

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        const {
            lang,
            begin,
            end
        } = this.props;

        const date = this.state.date;

        const {selectorType, month} = this.state;

        return (
            <div className={cx(this.props).build()}>
                <Header
                    date={date}
                    onClick={this.onHeaderClick} />
                <div className={cx().part('main').build()}>
                    <Pager
                        minDate={begin}
                        maxDate={end}
                        onChange={this.onPagerChange}
                        month={month} />
                    <Month
                        minDate={begin}
                        maxDate={end}
                        lang={lang}
                        month={month}
                        date={date}
                        onChange={this.onDateChange} />
                    <Selector
                        style={{display: selectorType === 'main' ? 'none' : null}}
                        date={date}
                        mode={selectorType === 'year' ? 'year' : 'month'}
                        minDate={begin}
                        maxDate={end}
                        onChange={this.onSelectorChange} />
                </div>
            </div>
        );

    }

}

CalendarPanel.displayName = 'CalendarPanel';

CalendarPanel.defaultProps = {
    date: new Date()
};

CalendarPanel.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    begin: PropTypes.instanceOf(Date),
    end: PropTypes.instanceOf(Date)
};
