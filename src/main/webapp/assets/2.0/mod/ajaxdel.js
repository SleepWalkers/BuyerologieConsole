define(function(require, exports, module) {

  $(document).on('click', '.mod-ajaxdel', function(ev){
    var $target = $(ev.target);
    var api = $target.attr('mod-data-api');
    var params = eval('(' + $target.attr('mod-data-params') + ')');
    var delParentSel = $target.attr('mod-data-delparentsel');
    bootbox.confirm("确认删除吗?", function(result){
    	if(result == true){
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
		        	bootbox.alert('删除失败');
		        }
	      });
    	}
    });
    return false;
  });
});