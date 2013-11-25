/**
 * 用于验证表单的函数
 * @param  {Element} form  一个包括所有要验证的表单的元素，一般但不限定为 form
 * @param  {Element} submit submit 元素，也可以是其它自定义的提交元素。可选
 * @param {Boolean} usesDefaultTip 是否使用默认的验证提示。默认为 True
 * @todo 提供一些供选的验证类型，以verify-type的形式指定，而不必自定义验证
 */
var Yzzc = {};
Yzzc.valid = function (form, submit, usesDefaultTip) {
  var validNodes;
  form = $(form);
  submit = $(submit) || $('input[type="submit"]');
  usesDefaultTip = usesDefaultTip || true;

  validNodes = $('[verify-type]', form);

  function makeTip (str, type) {
    type = type ? 'xtip-' + type : null;
    var n = $('<div class="x-tips" />');

    n.html('<i></i><span>'+str+'</span>');

    if (type) {
      n.addClass(type);
    }

    return n;
  }

  Yzzc.valid.makeTip = makeTip;

  function xTip (el, str, type) {
    var $this = $(el), tipBox, pos, x, y, h, node;

    if ( $this.next('.x-tips').length) {
      node = $this.next('.x-tips');
      if (type) {
        node.attr('class', 'x-tips xtip-'+ type);
      }
      if (str) {
        node.find('span').html(str);
      }
      return node;
    } else {
      pos = $this.position();
      x = pos.left + $this.outerWidth() + 12;
      h = $this.outerHeight();
      y = pos.top + h / 2;

      tipBox = makeTip(str, type).hide();
      $this.after( tipBox );

      return tipBox
      .css({
        left: x,
        top: (y - tipBox.outerHeight() / 2)
      });
    }
  }

  Yzzc.valid.xTip = xTip;

  // 验证主体函数
  form.delegate(validNodes, 'change verifyEvent', function(event) {
    var et = event.target, v, check;

    if (Object.prototype.hasOwnProperty.call(et, 'validate')) {
      check = et.validate;
    }

    $(et).data('verify', check);

    if (check) {
      $(et).trigger('verify.success');
    } else {
      $(et).trigger('verify.fail');
    }
  });

  form.delegate(validNodes.not('select'), 'focus', function(event) {
    var et = event.target, msg;

    msg = et.getAttribute('verify-msg');
    if (msg) {
      xTip(et, msg).fadeIn();
    }
  });

  // 点击提交后验证
  submit.bind('click', function(event) {
    var et = event.target,
    flag = true,
    len = validNodes.length,
    el,
    i = 0;

    while ( i < len ) {
      el = validNodes.eq(i);

      el.trigger('verifyEvent');
      i += 1;
      flag = flag && !!el[0].validate;
    }

    // event.preventDefault();

    et.validate = flag;
    if (flag){
      $(et).trigger('verify.success');
      return true;
    } else {
      $(et).trigger('verify.fail');
      return false;
    }
  });

  if (usesDefaultTip) {
    // 默认的错误提示
    form.delegate('input[verify-type]', 'verify.fail', function(event) {
      var et = event.target,

      str = $.trim( $(et).attr('verify-msg') );

      xTip(et, str, 'warnning').fadeIn();
    });
    // 默认的正确提示
    form.delegate('input[verify-type]', 'verify.success', function(event) {
        var et = event.target,

        str = $.trim( $(et).attr('verify-msg') ),
        tip = xTip(et, '\u9a8c\u8bc1\u6210\u529f', 'success').fadeIn();

        setTimeout(function () {
          tip.hide();
        }, 3000);
    });
  }
};