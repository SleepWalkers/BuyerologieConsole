define(function(require, exports, module) {
  var selectNav = {
    init : function() {
      $("select.mod-selectnav").change(function(){
    	var value = $(this).val();
    	if(value == null || $.trim(value) == ""){
    		return;
    	}
        location.href= value;
      })
    }
  };
  selectNav.init();
  return selectNav;
});