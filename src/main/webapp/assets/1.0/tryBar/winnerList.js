define(function(require, exports, module) {
	
  $(".preDate").datepicker();
	$(".afterDate").datepicker();

	//保存和拉黑获奖用户
	$(".savewinnerlist").on("click",function(ev){
		ev.preventDefault();
		$.ajax({
		    type: "GET",
		    url: "/api/tryBar/saveAwardUserInfo",
		    data:{
				userId: $(this).parents('tr').find('.userIdwinnerList').val(),
				userName: $(this).parents('tr').find('.userNamewinnerList').val().trim(),
        userTelephone: $(this).parents('tr').find('.userTelephonewinnerList').val().trim(),
        userAddress: $(this).parents('tr').find('.userAddresswinnerList').val().trim()
			},
		  success: function(msg){
		    alert( "保存成功: " + msg );
		  }
		});
	});

	$(".deletewinnerlist").on("click",function(ev){
		ev.preventDefault();
		var $deleteBtnwinnerlist = $(this);
		if(!confirm("确定要拉黑么？")){
			return;
		}
		$.ajax({
			type: "GET",
			url: "/api/tryBar/setBlackList",
			data: {
			  trialUserId: $(this).parents('tr').find('.trialUserIdwinnerList').val()
			},
			success: function(){
			  $deleteBtnwinnerlist.attr('value','已拉黑');
			}
		});
	});
});
