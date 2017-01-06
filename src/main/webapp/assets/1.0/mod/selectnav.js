define(function(require, exports, module) {
  var selectNav = {
    init : function() {
      $("select.mod-selectnav").change(function(){
        location.href= $(this).val();
      })
    }
  };
  selectNav.init();
  return selectNav;
});