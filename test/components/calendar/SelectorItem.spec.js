/**
 * @file CalendarSelectorItem单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import {shallow} from 'enzyme';
import CalendarSelectorItem from '../../../src/calendar/SelectorItem';
import then from '../../then';

describe('CalendarSelectorItem', function () {

    it('work', function () {
        const date = new Date(2016, 11, 1);
        const wrapper = shallow(
            <CalendarSelectorItem date={date} mode="month" />
        );
        expect(wrapper.prop('data-mode')).toBe('month');
        expect(wrapper.prop('data-value')).toBe(date);
        expect(wrapper.children().at(0).text()).toBe('12月');
    });


    it('click', done => {

        const spy = jasmine.createSpy();
        const date = new Date();

        let node = document.createElement('div');
        let component = ReactDOM.render(<CalendarSelectorItem date={date} mode="year" onClick={spy} />, node);
        TestUtils.Simulate.click(ReactDOM.findDOMNode(component));

        then(() => {
            expect(spy).toHaveBeenCalled();
            expect(spy.calls.allArgs()[0][0]).toEqual({target: component, date, mode: 'year'});
            ReactDOM.unmountComponentAtNode(node);
            node = null;
            done();
        });

    });

});
