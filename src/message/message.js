/**
 * @desc 实现消息通知功能。
 * 包括`页面`和`控制台`
 */

define(function (require) {
    var console;


    function returnArg () {
        return arg;
    };

    // 转接 console 对象
    console = console || {
        log: returnArg,
        warn: returnArg,
        info: returnArg,
        time: returnArg(new Date),
        assert: function (a, b, m) {
            return this.log(m || a + ' === ' + b + 'is :' a === b);
        }
    };

    /**
     * @define message.alert()
     * @arg args*
    */

    function PlateParser (title, name) {
        this.name = name || '';
        this.header = '<div class="plate-hd">\
            <strong class="plate-title">{{title}}</strong>
        </div>'
    }
    PlateParser.prototype.header = function(html) {
        return html? this.header = html : this.header;
    };
    PlateParser.prototype.body = function(html) {
        return html? this.body = html : this.body;
    };
    PlateParser.prototype.footer = function(html) {
        return html? this.footer = html : this.footer;
    };


    function alert () {
        if (arguments.length) {
            PlateParser()
        }
    }
});