/**
 * @file CalendarItemMixin
 * @author cxtom(cxtom2008@gmail.com)
 */

import {Component} from 'react';


/**
 * melon-calendar 选择单元基类
 *
 * @class
 * @extends {React.Component}
 */
export default class Item extends Component {

    /**
     * 构造函数
     *
     * @param  {Object} props   组件属性
     * @public
     */
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /**
     * 判断是否需要更新，性能优化
     *
     * @param  {Object} nextProps  组件新的属性
     * @return {bool}  是否需要更新
     * @public
     */
    shouldComponentUpdate(nextProps) {

        const {
            disabled,
            selected
        } = this.props;

        return nextProps.disabled !== disabled
            || nextProps.selected !== selected;

    }

    /**
     * 点击时触发
     *
     * @param  {Object} e  事件对象
     * @private
     */
    onClick(e) {

        e.preventDefault();

        const {
            disabled,
            onClick,
            date,
            mode
        } = this.props;

        if (disabled) {
            return;
        }

        if (onClick) {

            let e = {
                target: this,
                date: date
            };

            if (mode) {
                e.mode = mode;
            }

            onClick(e);
        }
    }

}
