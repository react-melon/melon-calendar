/**
 * @file CalendarDay 单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {shallow} from 'enzyme';
import TestUtils from 'react-dom/test-utils';
import CalendarDay from '../../../src/calendar/Day';
import then from '../../then';
import * as dateUtil from '../../../src/util';

describe('CalendarDay', function () {

    it('dom work', function () {
        const date = dateUtil.addDays(new Date(), -1);
        const wrapper = shallow(
            <CalendarDay date={date} />
        );

        expect(wrapper.is('a')).toBe(true);
        expect(wrapper.hasClass('ui-calendar-day')).toBe(true);
        expect(wrapper.prop('href')).toBe('#');
        expect(wrapper.text()).toEqual(date.getDate() + '');
    });

    it('dom className', function () {

        const date = new Date();
        const wrapper = shallow(
            <CalendarDay date={date} selected disabled />
        );
        expect(wrapper.prop('disabled')).toBe(true);
        expect(wrapper.hasClass('state-disabled')).toBe(true);

    });

    it('shouldComponentUpdate', () => {
        const component = TestUtils.renderIntoDocument(<CalendarDay date={new Date()} />);
        expect(TestUtils.isCompositeComponent(component)).toBe(true);
        expect(component.shouldComponentUpdate({date: new Date()})).toBe(false);
        expect(component.shouldComponentUpdate({selected: true})).toBe(true);
        expect(component.shouldComponentUpdate({disabled: true})).toBe(true);
    });

    it('click', done => {
        const spy = jasmine.createSpy();
        const date = new Date();

        let node = document.createElement('div');
        let component = ReactDOM.render(<CalendarDay date={date} onClick={spy} />, node);
        TestUtils.Simulate.click(ReactDOM.findDOMNode(component));

        then(() => {
            expect(spy).toHaveBeenCalled();
            /* eslint-disable fecs-no-arguments */
            expect(spy.calls.argsFor(0)[0]).toEqual({target: component, date});
            /* eslint-enable fecs-no-arguments */

            component = ReactDOM.render(
                <CalendarDay date={date} onClick={spy} disabled/>,
                node
            );
            TestUtils.Simulate.click(ReactDOM.findDOMNode(component));
        })
        .then(() => {
            expect(spy.calls.count()).toBe(1);
            ReactDOM.unmountComponentAtNode(node);
            node = null;
            done();
        });

    });

});
