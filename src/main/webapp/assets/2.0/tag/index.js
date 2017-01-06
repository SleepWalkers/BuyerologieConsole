define(function(require, exports, module) {
	var common = require("base/common");
	var tmpl = require("tpl");

	var tagIndex = {
		init : function() {
			var self = this;
			self._initAddTag();
			self._initSelectTagGroup();
		  self._initSaveTag();
			self._initDelTag();
		},
		_initAddTag : function() {
			$("#J_TagAdd").button().click(function() {
						$("#J_TagList").prepend($("#J_TagTPL").tmpl({}));
					});
		},
		_initSelectTagGroup : function() {
			$("#J_TagGroupSelect").wijcombobox({
						changed : function() {
							$("#J_TagForm")[0].submit();
						}
					});
		},
		_initSaveTag : function() {
			var tagList = $("#J_TagList");
			if (!tagList)
				return;
			tagList.delegate(".j_TagSave", "click", function(e) {
						e.preventDefault();
						var tag = $(this).parents(".j_Tag");
						var tagId = tag.attr("data-id");
						var tagName = $.trim(tag
								.find(".j_TagName").val());
						var tagGroupIdNode = tag
								.find(".j_TagGroupId");		
						var tagGroupId = tagGroupIdNode.val();
						if (!tagName) {
							alert("标签名字不能为空~");
							return;
						}
						var saveData = {
							tagId : tagId,
							tagName : tagName,
							tagTypeId : tagGroupId,
							originalTagTypeId:tagGroupIdNode.attr("data-tagGroupId")
						};
						$.get(common.api.publishTag, saveData,
								function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，保存标签失败，请稍后重试~");
										return;
									}
									tag.attr("data-id", result.data);
									tagGroupIdNode.attr("data-tagGroupId",tagGroupId);
									
									var mark = tag.find(".j_TagMark");

									mark.removeClass("tag-mark-unsave")
											.addClass("tag-mark-saved");
									setTimeout(function() {
										mark
												.removeClass("tag-mark-saved");
									}, 1000);
								}, "json").fail(function() {
									alert("发生系统错误，保存标签失败，请稍后重试~");
								});

					});
		},
		_initDelTag : function() {
			var tagList = $("#J_TagList");
			if (!tagList)
				return;
			tagList.delegate(".j_TagDel", "click", function(e) {
						e.preventDefault();
						var tag = $(this).parents(".j_Tag");
						var tagId = tag.attr("data-id"); 
						if (tag.find(".j_TagMark")
								.hasClass("tag-mark-unsave")) {
							tag.remove();
							return;
						}

						var delData = {
							tagId : tagId
						};
						$.get(common.api.delTag, delData,
								function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，删除标签失败，请稍后重试~");
										return;
									}
									tag.remove();
								}, "json").fail(function() {
									alert("发生系统错误，删除标签失败，请稍后重试~");
								});
					});
		}
	};

	return tagIndex;
});