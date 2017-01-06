define(function(require, exports, module) {
	var common = require("base/common");
	var tmpl = require("tpl");

	var scentIndex = {
		init : function() {
			var self = this;
			self._initAddScent();
			self._initSelectScentGroup();
		    self._initSaveScent();
			self._initDelScent();
		},
		_initAddScent : function() {
			$("#J_ScentAdd").button().click(function() {
				$("#J_ScentList").prepend($("#J_ScentTPL").tmpl({}));
			});
		},
		_initSelectScentGroup : function() {
			$("#J_ScentGroupSelect").wijcombobox({
						changed : function() {
							$("#J_ScentForm")[0].submit();
						}
					});
		},
		_initSaveScent : function() {
			var scentList = $("#J_ScentList");
			if (!scentList)
				return;
			scentList.delegate(".j_ScentSave", "click", function(e) {
						e.preventDefault();
						var scent = $(this).parents(".j_Scent");
						var scentId = scent.attr("data-id");
						var scentName = $.trim(scent
								.find(".j_ScentName").val());
						var scentAlias = $.trim(scent
								.find(".j_ScentAlias").val());
								var scentDesc = $.trim(scent
								.find(".j_ScentDesc").val());
						var scentGroupIdNode = scent
								.find(".j_ScentGroupId");		
						var scentGroupId = scentGroupIdNode.val();
						if (!scentName) {
							alert("成分名字不能为空~");
							return;
						}
						var saveData = {
							scentId : scentId,
							scentName : scentName,
							scentAlias : scentAlias,
							scentDesc : scentDesc,
							scentGroupId:scentGroupId,
							originalScentGroupId:scentGroupIdNode.attr("data-scentGroupId")
						};
						$.get(common.api.publishScent, saveData,
								function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，保存成分失败，请稍后重试~");
										return;
									}
									scent.attr("data-id", result.data);
									scentGroupIdNode.attr("data-scentGroupId",scentGroupId);
									
									var mark = scent.find(".j_ScentMark");

									mark.removeClass("scent-mark-unsave")
											.addClass("scent-mark-saved");
									setTimeout(function() {
										mark
												.removeClass("scent-mark-saved");
									}, 1000);
								}, "json").fail(function() {
									alert("发生系统错误，保存成分失败，请稍后重试~");
								});

					});
		},
		_initDelScent : function() {
			var scentList = $("#J_ScentList");
			if (!scentList)
				return;
			scentList.delegate(".j_ScentDel", "click", function(e) {
						e.preventDefault();
						var scent = $(this).parents(".j_Scent");
						var scentId = scent.attr("data-id"); 
						if (scent.find(".j_ScentMark")
								.hasClass("scent-mark-unsave")) {
							scent.remove();
							return;
						}

						var delData = {
							scentId : scentId
						};
						$.get(common.api.delScent, delData,
								function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，删除成分失败，请稍后重试~");
										return;
									}
									scent.remove();
								}, "json").fail(function() {
									alert("发生系统错误，删除成分失败，请稍后重试~");
								});
					});
		}
	};

	return scentIndex;
});