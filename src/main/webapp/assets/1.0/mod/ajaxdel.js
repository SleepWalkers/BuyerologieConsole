define(function(require, exports, module) {

  $(document).on('click', '.mod-ajaxdel', function(ev){
    var $target = $(ev.target);
    var api = $target.attr('mod-data-api');
    var params = eval('(' + $target.attr('mod-data-params') + ')');
    var delParentSel = $target.attr('mod-data-delparentsel');
    if(confirm('确认删除吗?')){
      $.ajax({
        url: api,
        type: 'post',
        dataType: 'json',
        data: params,
        success: function() {
          if(delParentSel){
            $target.parents(delParentSel).remove();
          } else {
            location.reload();
          }
        },
        error: function(){
          alert('删除失败');
        }
      });
    }
  });
});