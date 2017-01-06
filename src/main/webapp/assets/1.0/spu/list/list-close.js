define(function(require, exports, module){
	$('.j_close').on('click',function(){
		$.ajax({
			type:'GET',
			url:'/api/order/closeTimeOut',
			dataType:'json',
			cache: false,
			error:function(){
				alert('出错了 请联系机智的程序猿');
			},
			success:function(){
				alert('关闭成功 yeah !');
			}			
		});
	});
});