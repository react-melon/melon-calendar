/**
 * @file Calendar/CalendarSelectorItem
 * @author cxtom(cxtom2008@gmail.com)
 */

import React from 'react';
import PropTypes from 'prop-types';
import {create} from 'melon-core/classname/cxBuilder';
import Item from './Item';
import * as DateTime from '../util';

const cx = create('CalendarSelectorItem');

/**
 * melon-calendar 年、月选择单元
 *
 * @class
 * @extends {Item}
 */
export default class CalendarSelectorItem extends Item {

    /**
     * 渲染
     *
     * @public
     * @return {React.Element}
     */
    render() {

        const props = this.props;

        const {
            date,
            mode,
            disabled,
            selected,
            ...others
        } = props;


        return (
            <li
                {...others}
                data-mode={mode}
                data-value={date}
                onClick={disabled ? null : this.onClick}
                className={cx(props).addStates({selected}).build()} >
                <span>
                    {mode === 'year' ? date.getFullYear() : DateTime.getShortMonth(date)}
                </span>
            </li>
        );

    }

}

CalendarSelectorItem.displayName = 'CalendarSelectorItem';

CalendarSelectorItem.propTypes = {
    date: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    selected: PropTypes.bool,
    mode: PropTypes.oneOf(['month', 'year'])
};
