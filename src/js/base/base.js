/**
 * @fileOverview 基础类，提供一个命名空间
 * 目前只是希望 ‘适用即可’，有需要再增强
 * 参考了 google closure 等类库
 * 
 * 实现动态加载功能
 * 在命名空间下增加语言原生功能
 */

var chom = chom || {};

/**
 * 存储访问全局属性的一个引用
 * @type {Object}
 */
chom.global = this;


/**
 * 命名空间快速检测、设置及访问的工具方法，目的是简化属性、方法的定义过程
 * @param  {[String]} name 要扩展的路径。用逗号分割的
 * @param  {[*]} opt_object 扩展路径 对应的属性
 * @param  {[Object]} opt_toObject 可选的路径所属对象
 */
chom.definNS = function (name, opt_object, opt_toObject) {
    var parts = name.split('.'),
        cur = opt_toObject || chom.global;

    for (var part; parts.length && (part = parts.shift());) {
        if (!parts.length && opt_object !== undefined) {
            cur[part] = opt_object;
        } else if ( cur[part] ) {
            cur = cur[part];
        } else {
            cur = cur[part] = {};
        }
    }
};