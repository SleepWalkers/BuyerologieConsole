define(function(require, exports, module) {
  require("../mod/logout");
  require("../mod/ajaxform");
  require("../mod/selectnav");
  require("../mod/ajaxdel");
  require("../mod/ajaxaction");
  require("../mod/korows");
  require("../mod/rte");
  require("../mod/calpop");
  require("../mod/viewbox");
  
  // TODO 优化到非mod模块里
  require("../mod/jquery.cookie");
  require("../mod/styleswitch");
  require("../mod/zzsc");
  
  var Nav = require("../mod/nav");

  $(document).ready(function(){
    // ajax方法 全局处理
    $.ajaxPrefilter(function(options, originalOptions, jqXHR){
      // 异步加载脚本不做处理
      if(options.dataType == 'script'){
        return;
      }
      var tockenValue = $(':input[name=_synToken]').val();
      if(tockenValue){
        if(options.data){
          options.data += '&_synToken=' + tockenValue;
        } else {
          options.data = '_synToken=' + tockenValue;
        }
      }
      // 全局ajax跳转，用于登录判断跳转 或者ajax表单提交回调页面
      var normalizedRequest = $.Deferred();
      jqXHR.then(function(data, status, jqXHR) {
        // 返回如果是html解析会报错，用try简单处理
        try{
          var json = $.parseJSON(jqXHR.responseText);
          if(json.isRedirect){
            location.href = json.redirectURL;
            return;
          }
        }catch(err){
        }
        normalizedRequest.resolveWith(this, arguments);
      }, function() {
        normalizedRequest.reject();
      });
      jqXHR = normalizedRequest.promise(jqXHR);
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
    });
    
    var nodeText = $('#mod-nav-navTree').data('nodetext');
    if(nodeText){
      Nav.select(nodeText);
    }
    // 样式化表单元素
    $(":input[type='text'],:input[type='password']")
      .wijtextbox();
    $("select").wijcombobox();
    $(":input[type='radio']").wijradio();
    $(":input[type='checkbox']").wijcheckbox();
    $(":input[type='button'],:input[type='submit']").button();
    $("button").button();
  });
});