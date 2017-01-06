define(function(require, exports, module) {
	var common = require("base/common");
	require("./info-search-help");
	require("form");

	var spuDesc = {
		init : function() {
			var self = this;
			self._initSpuDesc()
		},
		_initSpuDesc : function() {
			$("#J_SpuIntro").wijeditor({
						mode : "simple",
						editorMode : "code",
						showFooter : false
					});		
			$("#J_SpuDesc").wijeditor({
						mode : "simple",
						editorMode : "code" ,
						showFooter : false
					});
            
			$("#J_SpuDescForm").submit(function(e) {
				var self = this;
				e.preventDefault();
				$(self).ajaxSubmit({
							url : common.api.publishIntro,
							dataType : "json",
							success : function(result) {
								if (result.isSuccess) {
									alert("保存简介和SEO描述成功了");
								} else {
									alert("由于" + result.msg
											+ "，保存简介和SEO描述失败了，请稍后重试~");
								}
							}
						});
				return false;
			});

		}
	};

	spuDesc.init()
	return spuDesc;

});