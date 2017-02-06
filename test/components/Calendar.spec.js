/**
 * @file Calendar单测
 * @author cxtom(cxtom2010@gmail.com)
 */

import React from 'react';
import {mount} from 'enzyme';
import moment from 'moment';

import then from '../then';

import Calendar from '../../src/Calendar';

/* eslint-disable max-nested-callbacks */

describe('Calendar', () => {

    let component;

    describe('basic', () => {

        beforeEach(() => {
            component = mount(
                <Calendar defaultValue="2016-01-13" />
            );
        });

        afterEach(() => {
            component.unmount();
            component = null;
        });

        it('show & hide', done => {

            const date = component.state('date');

            expect(date.getDate()).toBe(13);
            expect(date.getMonth()).toBe(0);
            expect(date.getFullYear()).toBe(2016);
            expect(component.state('open')).toBe(false);

            component.find('label').at(0).simulate('click');

            then(() => {
                expect(component.state('open')).toBe(true);

                const actions = document.querySelectorAll('.ui-button');
                expect(actions.length).toBe(2);

                actions[0].click();
            }).then(() => {
                expect(component.state('open')).toBe(false);
                done();
            });

        });

        it('onDateChange', done => {

            component.find('label').at(0).simulate('click');

            then(() => {
                const days = document.querySelectorAll('.ui-calendar-day');
                expect(days.length).toBe(42);

                days[13].click();

                const actions = document.querySelectorAll('.ui-button');
                expect(actions.length).toBe(2);

                actions[1].click();
            }).then(() => {
                const date = component.state('date');
                expect(date.getDate()).toBe(9);
                expect(date.getMonth()).toBe(0);
                expect(date.getFullYear()).toBe(2016);
                expect(component.state('open')).toBe(false);
                done();
            });

        });

    });

    it('defaultValue', done => {
        component = mount(
            <Calendar />
        );

        component.find('label').at(0).simulate('click');

        then(() => {
            const actions = document.querySelectorAll('.ui-button');
            expect(actions.length).toBe(2);
            actions[1].click();
        }).then(() => {
            expect(component.state('value')).toBe(moment(new Date()).format('YYYY-MM-DD'));
            component.unmount();
            component = null;
            done();
        });
    });

    it('autoConfirm', done => {

        component = mount(
            <Calendar
                defaultValue="2016-01-13"
                autoConfirm />
        );

        component.find('label').at(0).simulate('click');

        then(() => {
            const days = document.querySelectorAll('.ui-calendar-day');
            expect(days.length).toBe(42);

            days[14].click();
        })
        .then(() => {
            expect(component.state('open')).toBe(false);
            const date = component.state('date');
            expect(date.getDate()).toBe(10);
            expect(date.getMonth()).toBe(0);
            expect(date.getFullYear()).toBe(2016);

            component.unmount();
            component = null;
            done();
        });

    });

    it('controlled', done => {

        const changeSpy = jasmine.createSpy('change');

        component = mount(
            <Calendar
                value="2016-01-20"
                autoConfirm={true}
                onChange={changeSpy} />
        );

        component.find('label').at(0).simulate('click');

        then(() => {
            const days = document.querySelectorAll('.ui-calendar-day');
            expect(days.length).toBe(42);

            days[14].click();
        })
        .then(() => {
            expect(component.state('open')).toBe(false);
            expect(changeSpy).toHaveBeenCalled();
            expect(changeSpy.calls.argsFor(0)[0].value).toBe('2016-01-10');
            component.unmount();
            component = null;
            done();
        });

    });

});
