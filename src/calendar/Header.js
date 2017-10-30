/**
 * @file Calendar/CalendarHeader
 * @author cxtom(cxtom2008@gmail.com)
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as DateTime from '../util';
import {create} from 'melon-core/classname/cxBuilder';

const cx = create('CalendarHeader');

/**
 * CalendarHeader
 *
 * @class
 * @extends {React.Component}
 */
export default class CalendarHeader extends Component {

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        /* eslint-disable fecs-min-vars-per-destructure */
        const {
            date,
            ...rest
        } = this.props;

        const year = date.getFullYear();

        const week = DateTime.getDayOfWeek(date);
        const month = DateTime.getShortMonth(date);
        const day = date.getDate();

        const fullDate = month + day + '日';

        return (
            <div {...rest} className={cx(this.props).build()}>
                <p className={cx.getPartClassName('year')}>{year}</p>
                <p className={cx.getPartClassName('week')}>{week}</p>
                <p className={cx.getPartClassName('date')}>{fullDate}</p>
            </div>
        );

    }
}

CalendarHeader.displayName = 'CalendarHeader';

CalendarHeader.propTypes = {
    date: PropTypes.object.isRequired
};
