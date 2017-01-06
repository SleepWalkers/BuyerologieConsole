define(function(require, exports, module) {
			var common = require("base/common");
			require("./info-search-help");
			require("form");

			var spuDesc = {
				init : function() {
					var self = this;
					self._initSpuForm();
				},
				_initSpuForm : function() {
					$("#J_SpuBaseForm").submit(function(e) {
						e.preventDefault();
						var self = this;
						var requireEls = $(".j_SpuBaseRequire");
						for (var i = 0; i < requireEls.length; i++) {
							if (!$.trim(requireEls[i].value)) {
								alert("请检查带红*的必填项~");
								return;
							}
						}
						var rate = parseFloat($.trim($(".j_SpuRate").val()));
						if(rate){
							if (isNaN(rate) || rate < 0 || rate > 10) {
								alert("单品评分为0~10之间的整数,请修改后重新保存");
							}
						}
						$(self).ajaxSubmit({
							url : common.api.publishBase,
							dataType : "json",
							success : function(result) {
								if (result.isSuccess) {
									alert("保存基本信息成功了~");
								} else {
									alert("由于" + result.msg
											+ "，保存基本信息失败了，请稍后重试~");
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