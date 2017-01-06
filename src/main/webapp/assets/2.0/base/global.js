define(function(require, exports, module) {
  require("../mod/logout");
  require("../mod/ajaxform");
  require("../mod/selectnav");
  require("../mod/ajaxdel");
  require("../mod/ajaxaction");
  require("../mod/korows");

  // TODO 优化到非mod模块里
  require("../mod/jquery.cookie");

  $(document).ready(function() {
    // ajax方法 全局处理
    $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
      // 异步加载脚本不做处理
      if (options.dataType == 'script') {
        return;
      }
      var tockenValue = $(':input[name=_synToken]').val();
      if (tockenValue) {
        if (options.data) {
          options.data += '&_synToken=' + tockenValue;
        } else {
          options.data = '_synToken=' + tockenValue;
        }
      }
      // 全局ajax跳转，用于登录判断跳转 或者ajax表单提交回调页面
      var normalizedRequest = $.Deferred();
      jqXHR.then(function(data, status, jqXHR) {
        // 返回如果是html解析会报错，用try简单处理
        try {
          var json = $.parseJSON(jqXHR.responseText);
          if (json.isRedirect) {
            location.href = json.redirectURL;
            return;
          }
        } catch (err) {}
        normalizedRequest.resolveWith(this, arguments);
      }, function() {
        normalizedRequest.reject();
      });
      jqXHR = normalizedRequest.promise(jqXHR);
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
    });
  });
});