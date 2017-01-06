define(function(require,exports,module){
   var searchForm = {
   	   fields:{
   	   	  keyword:$("#J_SpuKeyword").wijtextbox().keydown(function(e){
   	   	    if(e.keyCode==13){
   	   	    	$("#J_SpuSearchBtn").click();
   	   	    }
   	   	  }),
   	   	  isPub: $('#I_IsPub').wijcheckbox()
   	   },
   	   searchBtn:$("#J_SpuSearchBtn").button(),
   	   stateSelect:$('#J_PublishStateSelect').wijcombobox({isEditable: false})
   }
   return searchForm;
});