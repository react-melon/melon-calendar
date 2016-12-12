(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', '../babelHelpers'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('../babelHelpers'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.babelHelpers);
        global.Item = mod.exports;
    }
})(this, function (exports, _react, babelHelpers) {
    'use strict';

    exports.__esModule = true;

    var Item = function (_Component) {
        babelHelpers.inherits(Item, _Component);

        /**
         * 构造函数
         *
         * @param  {Object} props   组件属性
         * @public
         */
        function Item(props) {
            babelHelpers.classCallCheck(this, Item);

            var _this = babelHelpers.possibleConstructorReturn(this, _Component.call(this, props));

            _this.onClick = _this.onClick.bind(_this);
            return _this;
        }

        /**
         * 判断是否需要更新，性能优化
         *
         * @param  {Object} nextProps  组件新的属性
         * @return {bool}  是否需要更新
         * @public
         */


        Item.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
            var _props = this.props,
                disabled = _props.disabled,
                selected = _props.selected;


            return nextProps.disabled !== disabled || nextProps.selected !== selected;
        };

        Item.prototype.onClick = function onClick(e) {

            e.preventDefault();

            var _props2 = this.props,
                disabled = _props2.disabled,
                onClick = _props2.onClick,
                date = _props2.date,
                mode = _props2.mode;


            if (disabled) {
                return;
            }

            if (onClick) {

                var _e = {
                    target: this,
                    date: date
                };

                if (mode) {
                    _e.mode = mode;
                }

                onClick(_e);
            }
        };

        return Item;
    }(_react.Component);

    exports['default'] = Item;
});
//# sourceMappingURL=Item.js.map
