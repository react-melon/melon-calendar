/**
 * @file Calendar/CalendarDay
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {PropTypes} from 'react';
import {create} from 'melon-core/classname/cxBuilder';
import * as DateTime from '../util';
import Item from './Item';

const cx = create('CalendarDay');


/**
 * melon-calendar 日期选择单元
 *
 * @class
 * @extends {Item}
 */
export default class CalendarDay extends Item {

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        const {
            date,
            selected,
            ...others
        } = this.props;

        const className = cx(this.props)
            .addVariants(DateTime.isEqualDate(date, new Date()) ? 'today' : null)
            .addStates({selected})
            .build();

        return (
            <a
                {...others}
                className={className}
                href="#"
                onClick={this.onClick} >
                {date.getDate()}
            </a>
        );

    }

}

CalendarDay.displayName = 'CalendarDay';

CalendarDay.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool
};
