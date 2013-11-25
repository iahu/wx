/**
 * 实现编辑语言常见的include功能： 嵌入 html/template、css、js、plain 等文件
 * @param  {string} url   一个文件的URL
 * @param  {[object]} data 可选的参数，可作为替换嵌入进来的模板文件的替换数据
 */
var include = (function() {
  function include(url, data) {
    // enforces new
    if (!(this instanceof include)) {
      return new include(url, data);
    }
    
    // 创建一个临时的点位元素供加载进来时替换用。
    this.id = 'include-placeholder-' + new Date().getTime();
    this.data = data;
    this.plh = document.createElement('div');
    this.plh.id = this.id;
    document.write( this.plh.outerHTML );

    this.loadText(url);
  }

  include.prototype.loadText = function (url) {
    var xmlhttp,
    inc = this,
    textNode = document.getElementById(inc.id);

    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xmlhttp.open('GET', url, true);
    xmlhttp.send();

    xmlhttp.onreadystatechange = function () {
      var text;
      if (xmlhttp.readyState == 4) {
        if (xmlhttp.status == 200) {
          text = xmlhttp.responseText;
          textNode.outerHTML = inc.data? inc.replace(text, inc.data) : text;
        } else {
          textNode.outerHTML = 'Error:' + xmlhttp.status;
        }
      }
    };
  };

  include.prototype.replace = function(str, data) {
    var cache = {};
    
    function tmpl(str, data){
      // Figure out if we're getting a template, or if we need to
      // load the template - and be sure to cache the result.
      var fn = !/\W/.test(str) ?
        cache[str] = cache[str] ||
          tmpl(document.getElementById(str).innerHTML) :
       
        // Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj",
          "var p=[],print=function(){p.push.apply(p,arguments);};" +
         
          // Introduce the data as local variables using with(){}
          "with(obj){p.push('" +
         
          // Convert the template into pure JavaScript
          str
            .replace(/[\r\t\n]/g, " ")
            .split("<%").join("\t")
            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
            .replace(/\t=(.*?)%>/g, "',$1,'")
            .split("\t").join("');")
            .split("%>").join("p.push('")
            .split("\r").join("\\'")
        + "');}return p.join('');");
     
      // Provide some basic currying to the user
      // 
      return data ? fn( data ) : fn;
    };

    return tmpl(str, data);
  };

  return include;

}());