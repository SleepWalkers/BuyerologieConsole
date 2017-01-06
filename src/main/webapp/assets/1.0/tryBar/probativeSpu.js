define(function(require, exports, module) {
	
	$(document).ready(function() {
		$.fn.mylive=function(eventType,fn){  
			var that=this.selector;  
			$(document).bind(eventType,function(event){  
				var match=$(event.target).closest(that)  
				if(match.length !== 0){  
					fn.apply($(event.target),[event]);  
				}  
			}) 
		} 
		//显示下拉框	
	    $(".item").hide(); 
		$(".readItem").mylive('click',function(){
			$(this).parent().siblings('.item').slideToggle();
		});
		//删除提示  
		$('.confirmBtn').mylive('click',function(event){ 
			if(confirm("确定要删除么？")){
				$(this).parent().remove();
			}
		});  
		//下拉框的样式和内容
		$('.addItem').mylive("click",function(){
			var newItem = $('<li class="count"></li>').html($('.count').html());
			newItem.find('.readInput').attr('value',' ');
			newItem.find('.hiddenId').attr('value',' ');
			newItem.find('.picTrail').attr('src','');
			newItem.find('.spuname').html('');
			newItem.find('textarea').attr('value',' ');
			newItem.find('.trailInput').attr('value',' ');
			$(".Itemlist").append(newItem);
		});
			
		//清空按钮		
		$(".delete").on("click",function(){
			
			if($(".readInput").val()){
				$(".readInput").attr("value"," ");
				$('.picTrail').attr('src','');
				$('.spuname').html('');
				$('.textarea').attr('value',' ');
				$('.trailInput').attr('value',' ');
			}
		});	
		
		//异步获取
		$(".readItem").each(function(){
		    this.mylive('click',function(){
			var objectSpu=$(this).parent().siblings('.item');
			self = $(this);
		    
		    	$.ajax({
			    type: "GET",
				url:"/api/tryBar/getSpuInfo",
				data:{
					spuUrl: self.siblings('.readInput').val()
				},
				//data:
				dataType:'json',
				success:function(json){
					var data = json.data;
					objectSpu.find('.picTrail').attr('src',data.spuImage);//spuImage 
					objectSpu.find('.spuname').html(data.spuName);
					
				},
				error:function(msg){
					alert(msg);
				}
			});
		    })			
		});
	});
});
