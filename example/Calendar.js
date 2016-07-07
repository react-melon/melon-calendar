/**
 * @file melon demo Tabs
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';

import Title from 'melon/Title';

import Calendar from '../src/Calendar';
import RangeCalendar from '../src/RangeCalendar';
import UnitCalendar from '../src/UnitCalendar';

class View extends React.Component {

    constructor() {
        super();
        this.state = {
            weekRange: [],
            value: '2015-08-07',
            monthRange: []
        };
    }

    onChange(e) {
        this.setState({value: e.value});
    }

    render() {

        return (
            <div>
                <Title level={3}>Calendar</Title>


                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>自动确定</Title>
                        <Calendar autoConfirm size="xs" />
                    </div>
                </div>
                <div className="melon-row">
                    <div className="melon-column melon-column-4">
                        <Title level={5}>被控制的控件</Title>
                        <Calendar
                            autoConfirm
                            value={this.state.value}
                            onChange={this.onChange.bind(this)} size="xs" />
                    </div>
                    <div className="melon-column melon-column-4">
                        {this.state.value}
                    </div>
                </div>

            </div>
        );
    }
}


module.exports = View;
