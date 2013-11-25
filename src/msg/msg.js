var Msg = (function() {
    'use strict';

    var guid = (Math.random() * 1e9) >>> 0,
        baseClass = 'msg ',
        CREATED = {};
    function getUid () {
        return 'msg-' + (++guid);
    }

    function createElement (nodeName, text, className, id) {
        var node = document.createElement(nodeName);

        if (id) {
            node.id = id;
        }

        if (className) {
            node.className = className;
        }

        if (text) {
            node.innerHTML = text;
        }

        return node;
    }

    function _createElement (nodeName, attrs) {
        var node, attr, hasOwn, styles,
        attrMap = {
            'html': 'innerHTML',
            'class': 'className',
            'for': 'htmlFor'
        };

        if (!nodeName) {return null;}

        node = document.createElement(nodeName);

        if (typeof attrs === 'object') {
            hasOwn = attrs.hasOwnProperty;
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

    function Msg(content) {
        // enforces new
        if (!(this instanceof Msg)) {
            return new Msg(content);
        }

        this.btnValues = {
            OK: '\u786e\u5b9a',
            CANCLE: '\u53d6\u6d88'
        };

        this.content = content;
        this.elem = this._base(content);
    }

    Msg.prototype._base = function () {
        if ( this.id && CREATED.hasOwnProperty(this.id) ) {
            return CREATED[this.id];
        }

        this.id = getUid();
        // var msg = createElement('div', '', '', this.id);
        
        var msg = _createElement('div', {id: this.id});

        msg.style.display = 'none';
        document.body.appendChild(msg);

        CREATED[this.id] = msg;

        return msg;
    };

    Msg.prototype.show = function() {
        this.elem.style.display = 'block';
    };

    Msg.prototype.alert = function(callback) {
        var alertNode = _createElement('div', {'class': baseClass+ 'msg-alert'}),
        hd = _createElement('h5', {'class': 'msg-hd'}),
        bd = _createElement('div', {html: this.content}),
        btnBox = _createElement('div', {'class':'msg-btn-group'}),
        btn = _createElement('button', {
            html: this.btnValues.OK,
            className: 'msg-btn-ok'
        });

        btnBox.appendChild(btn);

        alertNode.appendChild(hd);
        alertNode.appendChild(bd);
        alertNode.appendChild(btnBox);

        this.elem.appendChild(alertNode);

        this.show();

        if (typeof callback === 'function') {
            callback.apply(this);
        }
    };

    return Msg;

}());