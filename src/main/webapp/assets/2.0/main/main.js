function getHost(){
	return window.location.host;
}

/**
 * 主函数
 */
$(document).ready(function() {
  //Create an expression that excludes execution if parent matches certain class
  jQuery.expr[':'].noparents = function(a, i, m) {
    return jQuery(a).parents(m[3]).length < 1;
  };

  /**
   * @yidao
   * powerwidgets插件，用于panel的伸缩及关闭
   * 详细见 ui-advancedpanels.html
   * 该组件只能用id做selector，这里关闭了本地存储于排序功能
   *
   * 使用注意事项：
   * 1.必须在panel的父级以上申明id为'panel-advancedoptions'的模块
   * 2.在.panel上增加id字段
   */
  $('#panel-advancedoptions').panels({
    localStorage: false,
    sortable: false,
    editButton: false
  });

  // Custom Checkboxes
  $('.icheck input').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass: 'iradio_minimal-blue'
  });
  // iCheck
  // Loop through all the checkbox/radio classes and assign them colors and styles
  var myArr = ["minimal", "flat", "square"];
  var aCol = ['red', 'green', 'aero', 'grey', 'orange', 'pink', 'purple', 'yellow', 'purple', 'yellow', 'blue']

  for (var i = 0; i < myArr.length; ++i) {
    for (var j = 0; j < aCol.length; ++j) {
      // $('.icheck-minimal .blue.icheck input').iCheck({checkboxClass: 'icheckbox_minimal-blue',radioClass: 'iradio_minimal-blue'});
      $('.icheck-' + myArr[i] + ' .' + aCol[j] + '.icheck input').iCheck({
        checkboxClass: 'icheckbox_' + myArr[i] + '-' + aCol[j],
        radioClass: 'iradio_' + myArr[i] + '-' + aCol[j]
      });
    }
  }
  
  // datePicker
  $(".bt-date").datetimepicker({
	  format: 'yyyy-mm-dd hh:00:00',
	  minView: 1,
	  autoclose: true,
      todayBtn: true,
      todayHighlight: true,
      language: "zh-CN",
      forceParse: false
  });
  
  $(".bt-date-simple").datetimepicker({
	  format: 'yyyy-mm-dd 00:00:00',
	  minView: 2,
	  autoclose: true,
      todayBtn: true,
      todayHighlight: true,
      language: "zh-CN",
      forceParse: false
  });
  
  $(".select2").select2();
});