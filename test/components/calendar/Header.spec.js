/**
 * @file CalendarHeader单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import {shallow} from 'enzyme';
import CalendarHeader from '../../../src/calendar/Header';
import * as dateUtil from '../../../src/util';

describe('CalendarHeader', function () {

    it('work', function () {
        const date = new Date();
        const wrapper = shallow(
            <CalendarHeader date={date} />
        );

        expect(wrapper.hasClass('ui-calendar-header')).toBe(true);
        expect(wrapper.children().length).toBe(3);
        expect(wrapper.children().at(0).text()).toBe(date.getFullYear() + '');
        expect(wrapper.children().at(0).hasClass('ui-calendar-header-year')).toBe(true);

        expect(wrapper.children().at(1).text()).toBe(dateUtil.getDayOfWeek(date) + '');
        expect(wrapper.children().at(1).hasClass('ui-calendar-header-week')).toBe(true);

        expect(wrapper.children().at(2).text()).toBe(
            dateUtil.getShortMonth(date) + date.getDate() + '日'
        );
        expect(wrapper.children().at(2).hasClass('ui-calendar-header-date')).toBe(true);

    });

});
