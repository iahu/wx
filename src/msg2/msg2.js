var Msg = (function() {
    'use strict';

    var guid = (Math.random() * 1e9) >>> 0;

    function Msg() {
        // enforces new
        if (!(this instanceof Msg)) {
            return new Msg();
        }

        this.customClass = '';
    }


    function _createElement(nodeName, attrs) {
        var node, attr, hasOwn, styles,
        attrMap = {
            'html': 'innerHTML',
            'class': 'className',
            'for': 'htmlFor'
        };

        if (!nodeName) {return null;}

        node = document.createElement(nodeName);
        if (typeof attrs === 'object') {
            hasOwn = function (p) {
                return Object.prototype.hasOwnProperty.call(attrs, p);
            };
            // 处理 `css` 属性
            if ( hasOwn('css') ) {
                styles = attrs.css;
                
                if (typeof styles === 'string') {
                    node.style.cssText = styles;
                }
                // 避免加入到下面的循环
                delete attrs.css;
            }

            for (attr in attrs) {
                if ( hasOwn(attr) ) {
                    node[ attrMap[attr] || attr ] = attrs[attr];
                }
            }
        }
        
        return node;
    }

    function append (p, c) {
        return p.appendChild(c);
    }

    function addListener (el, e, handler, f) {
        if (window.addEventListener) {
            return window.addEventListener(el, e, handler, f);
        } else if (window.atatch) {}
    }

    function Base (content, cls) {
        var base = _createElement('div', {
            id: gui++,
            className: cls,
            html: content
        });

    }

    Msg.prototype.alert = function(content) {
        var eAlert = _createElement('div', {
            id: guid++,
            'class': this.customClass + ' ui-back ui-back-alert'
        });

        return append(document.body, eAlert);
    };

    return Msg;

}());