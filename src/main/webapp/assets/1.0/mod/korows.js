define(function(require, exports, module) {
  require('knockout');
  var common = require("base/common");
  var KoRows = function(rows, container) {
    var me = this;

    me.rows = ko.observableArray(rows);
 
    me.addRow = function(row) {
      // 复制到新对象，避免出现重复元素
      row = $.extend({}, row);
      me.rows.push(row);
      // 重新渲染表单 
      common.renderForm($(container));
    };
  
    me.removeRow = function(row) {
      me.rows.remove(row);
    };
    
  };

  $('.mod-korows').each(function(index, item){
    var rows = eval('(' + $(item).data('rows') + ')');
    var viewModel = new KoRows(rows, item);
    ko.applyBindings(viewModel, item);
  })
   
});