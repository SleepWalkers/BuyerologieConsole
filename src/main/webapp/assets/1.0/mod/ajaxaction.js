define(function(require, exports, module) {

  $(document).on('click', '.mod-ajaxaction', function(ev){
    var $target = $(ev.target);
    var api = $target.attr('mod-data-api');
    var params = eval('(' + $target.attr('mod-data-params') + ')');
    var parentSel = $target.attr('mod-data-parentsel');
      $.ajax({
        url: api,
        type: 'post',
        dataType: 'json',
        data: params,
        success: function() {
          if(parentSel){
            $target.parents(parentSel).remove();
          } else {
            location.reload();
          }
        },
        error: function(){
          alert('操作失败');
        }
      });
  });
});