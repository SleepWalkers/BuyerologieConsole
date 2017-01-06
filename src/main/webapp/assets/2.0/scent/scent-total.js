define(function(require, exports, module) {
			var common = require("base/common");
			var tmpl = require("tpl");
			common.renderForm();
		
			var scentTotal = {
				init : function() {
					var self = this;
					self._initAddScentTotal();
					self._initSaveScentTotal();
					self._initDelScentTotal();
				},
				_initAddScentTotal:function(){
				  $("#J_ScentTotalAdd").button().click(function(){
				  	$("#J_ScentTotalList").prepend($("#J_ScentTotalTPL").tmpl({}));
					common.renderForm();
				  });
				},
				_initSaveScentTotal:function(){
					var scentTotalList = $("#J_ScentTotalList");
					if(!scentTotalList) return;
				   scentTotalList.delegate(".j_ScentTotalSave", "click", function(e) {
						e.preventDefault();
						var scentTotal  = $(this).parents(".j_ScentTotal");
						var scentTotalId = scentTotal.attr("data-id");
						var scentTotalName = $.trim(scentTotal.find(".j_ScentTotalName").val());
						var scentTotalDesc = $.trim(scentTotal.find(".j_ScentTotalDesc").val());
						if (!scentTotalName) {
							alert("香调名字不能为空~");
							return;
						}
						var saveData = {
							scentTotalId : scentTotalId,
							scentTotalName : scentTotalName,
							scentTotalDesc : scentTotalDesc
						};
						$.get(common.api.saveScentTotal, saveData, function(result) {
							if (!result.isSuccess) {
								alert("发生系统错误，保存香调失败，请稍后重试~");
								return;
							}
							scentTotal.attr("data-id", result.data);
							var mark = scentTotal.find(".j_ScentTotalMark");

							mark.removeClass("scent-total-mark-unsave")
									.addClass("scent-total-mark-saved");
							setTimeout(function() {
										mark.removeClass("scent-total-mark-saved");
									}, 1000);
						}, "json").fail(function() {
									alert("发生系统错误，保存香调失败，请稍后重试~");
								});

					});
				},
				_initDelScentTotal:function(){
					var scentTotalList = $("#J_ScentTotalList");
					if(!scentTotalList) return;
					scentTotalList.delegate(".j_ScentTotalDel", "click", function(e) {
						e.preventDefault();
						var scentTotal  = $(this).parents(".j_ScentTotal");
						var scentTotalId = scentTotal.attr("data-id");
						var scentTotalName = $.trim(scentTotal.find(".j_ScentTotalName").val());
						if (scentTotal.find(".j_ScentTotalMark")
								.hasClass("scent-total-mark-unsave")) {
							scentTotal.remove();
							return;
						}

						var delData = {
							scentTotalId : scentTotalId,
							scentTotalName : scentTotalName
						};
						$.get(common.api.delScentTotal, delData, function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，删除香调失败，请稍后重试~");
										return;
									}
									scentTotal.remove();
								}, "json").fail(function() {
									alert("发生系统错误，删除香调失败，请稍后重试~");
								});

					});
				}
				
			};

			return scentTotal;
		});