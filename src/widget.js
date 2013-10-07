/**
 * Widget 基础类，其它 widget 都应从它扩展而来
 * 
 * @param options {[Array]} 接受以下几个设置：
 * @type {String} options.name         此widget注册的名字
 * @type {String} options.parentNode   将要添加 widget 父元素，默认为 `body`元素
 * @type {String} options.bindNode     触发widget显示危隐藏等的那个元素
 * @type {String} options.boxNodeName  容器元素的 nodeName，默认`div`
 * @type {String} options.attrs        容器元素的html属性
 * @type {String} options.id           唯一的 ID，不填将引用 options.name
 * @type {String} options.desc         描述容器元素[`title`属性]的文字，默认为空
 * @type {String} options.content      将要显示的内容，默认为空
 * @type {Number} options.width        默认不必加 `px`
 * @type {Number} options.height       默认不必加 `px`
 * @type {String} options.visible      是否[在创建后立即]显示，默认为`真`
 * @type {String} options.events       提供事件接口
 * 
 * @return {[Object]}
 */
var Widget = (function() {
    'use strict';

    /**
     * @class Widget
     * @constructor
     */
    var EMPTY_FN = function () {},
        TOSTRING = Object.prototype.toString;
    function isFunction (f) {
        return typeof f === 'function';
    }

    function isArray (a) {
        return a.isArray || TOSTRING.call(a) == '[object Array]';
    }

    function isObject (o) {
        return TOSTRING.call(o) == '[object Object]';
    }

    function extend () {
        var args = Array.prototype.slice.call(arguments),
            targetObj, arg, i = 0, arr, j = 0, obj, item, k;

        if ( !args.length) {return null};

        if (args.length == 1) {
            return args[0];
        } else {
            args = Array.prototype.slice.call(arguments);
            targetObj = args.shift();
        }

        while (arg = args[i]) {
            i += 1;

            if ( !isObject(arg) ) {
                throw 'arguments must be [object Object]';
                return null;
            };

            for (item in arg) {
                
                if ( isArray( arg[item] ) ) {
                    obj = targetObj[item];
                    while (k = arg[item][j]) {
                        j += 1;
                        if ( isArray(k) ) {
                            extend(obj, k);
                        };
                    };
                    console.log(obj, arg[item]);
                    targetObj[item] = obj.concat( arg[item] );

                } else if ( isObject( arg[item] ) ) {
                    obj = arg[item];
                    for (k in obj ) {
                        if (obj.hasOwnProperty(prop)) {
                            extend( targetObj[prop], prop );
                        };

                        targetObj[prop] = arg[prop];
                    }
                }
            }
        };

        return targetObj;
    }

    function createElement (n, a, c) {
        var node, k, 
        mHtmlAttr = {
            'class': 'className',
            'for': 'htmlFor'
        };
        if (!n) {return null};
        
        node = document.createElement(n);

        a.innerHTML = c;
        for (k in a) {
            if (a.hasOwnProperty(k)) {
                node[ mHtmlAttr[k] || k ] = a[k];
            }
        }
        return node;
    }

    function Widget(options) {
        var widget = this, opts, uid, UINT;

        // enforces new
        if (!(this instanceof Widget)) {
            return new Widget(options);
        }

        widget.rendered = false;
        options = options || {};
        uid = 0;
        UINT = 'px';
        opts = {
            parentNode: null,
            bindNode: '',
            boxNodeName: 'div',
            id: 'ui-widget-' + (uid + 1),
            className: ['ui-widget'],
            attrs: {},
            desc: '',
            content: '',
            visible: true,
            beforeRender : EMPTY_FN,
            afterRender: EMPTY_FN
        }

        // 合并 opts 和 options 属性
        extend(opts, options);

console.log(opts);

        widget.init(opts);
    }

    Widget.prototype.init = function(options) {
        var w = this, opts = options, i = 0, para, paraNames, wa;
        w.NAME = 'widget';

        paraNames = ['id', 'className', 'bindNode', 'boxNodeName', 
            'beforeRender', 'afterRender', 'parentNode', 'content', 'attrs'];

        while (para = paraNames[i]) {
            w[para] = opts[para];
            i += 1;
        };

        wa = w.attrs;
        wa.id = w.id;
        wa.className ? 
            wa.className.concat(w.className) :
            wa.className = w.className;
    };


    Widget.prototype.render = function(parentNode) {
        var widget = this;
        if ( !(parentNode && parentNode instanceof Element) ) {
            parentNode = widget.parentNode || document.body;
        };
        widget.parentNode = parentNode;

        if ( isFunction(widget.beforeRender) 
            && widget.beforeRender() === false ) {
            return false;
        };

        widget._renderUI();
        widget.renderUI();

        if ( isFunction(widget.afterRender) && widget.afterRender() === false ) {
            return false;
        };

        widget._bindUI();
        widget.bindUI();

        widget.rendered = true;
    }

    Widget.prototype.renderUI = EMPTY_FN;
    Widget.prototype.bindUI = EMPTY_FN;
    
    Widget.prototype._renderUI = function() {
        var widget = this;
        if (widget.rendered) {return};
        widget.el = createElement(widget.boxNodeName, widget.attrs, 
                        widget.content);
        widget.parentNode.appendChild(widget.el);
    };
    Widget.prototype._bindUI = function (events) {
        
    };
    Widget.prototype.show = function() {
        
    };
    Widget.prototype.hide = function() {
        
    };

    Widget.prototype.destroy = function(all) {
        
    };

    return Widget;
}());