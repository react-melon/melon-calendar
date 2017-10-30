/**
 * @file CalendarPager单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {shallow} from 'enzyme';
import Icon from 'melon/Icon';
import CalendarPager from '../../../src/calendar/Pager';
import then from '../../then';

describe('CalendarPager', function () {

    it('work', function () {
        const date = new Date(2016, 11, 1);
        const wrapper = shallow(
            <CalendarPager month={date} />
        );
        expect(wrapper.hasClass('ui-calendar-pager'));
        expect(wrapper.children().length).toBe(3);
        expect(wrapper.children().at(0).is(Icon)).toBe(true);
        expect(wrapper.children().at(0).hasClass('ui-calendar-pager-prev')).toBe(true);
        expect(wrapper.children().at(0).prop('icon')).toBe('navigate-before');

        expect(wrapper.children().at(1).is(Icon)).toBe(true);
        expect(wrapper.children().at(1).hasClass('ui-calendar-pager-next')).toBe(true);
        expect(wrapper.children().at(1).prop('icon')).toBe('navigate-next');

        expect(wrapper.children().at(2).text()).toBe('2016 年 12 月');

    });


    it('minDate', function () {
        const date = new Date(2015, 10, 1);
        const wrapper = shallow(
            <CalendarPager month={date} minDate={new Date(2015, 11, 1)} />
        );
        expect(wrapper.children().at(2).text()).toBe('2015 年 11 月');
    });


    it('maxDate', function () {
        const date = new Date(2015, 10, 1);
        const wrapper = shallow(
            <CalendarPager month={date} maxDate={new Date(2015, 9, 1)} />
        );
        expect(wrapper.children().at(2).text()).toBe('2015 年 11 月');
    });

    it('click', done => {

        const spy = jasmine.createSpy();
        const date = new Date(2015, 10, 1);

        const component = TestUtils.renderIntoDocument(<CalendarPager month={date} onChange={spy} />);
        const icons = TestUtils.scryRenderedDOMComponentsWithClass(component, 'ui-icon');

        // 上一月
        TestUtils.Simulate.click(icons[0]);

        /* eslint-disable fecs-no-arguments */
        then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy.calls.argsFor(0)[0]).toEqual({target: component, month: new Date(2015, 9, 1)});

            // 下一月
            TestUtils.Simulate.click(icons[1]);
        })
        .then(() => {
            expect(spy.calls.count()).toBe(2);
            expect(spy.calls.argsFor(1)[0]).toEqual({target: component, month: new Date(2015, 11, 1)});

            done();
        });
        /* eslint-enable fecs-no-arguments */

    });

});
