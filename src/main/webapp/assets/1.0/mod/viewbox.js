define(function(require, exports, module) {  $(".mod-viewbox").each(function(index, item){	var $hd = $(item).find('.mod-viewbox-hd');	$hd.click(function(){		$(item).toggleClass('mod-viewbox-close');	})  })});