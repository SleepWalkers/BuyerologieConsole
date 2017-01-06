define(function(require, exports, module) {
	var common = require("base/common");
	var tmpl = require("tpl");
	common.renderForm();

	var tagGroup = {
		init : function() {
			var self = this;
			self._initAddTagGroup();
			self._initSaveTagGroup();
			self._initDelTagGroup();
		},
		_initAddTagGroup:function(){
		  $("#J_TagGroupAdd").click(function(){
		  	$("#J_TagGroupList").prepend($("#J_TagGroupTPL").tmpl({}));
			common.renderForm();
		  });;
		},
		_initSaveTagGroup:function(){
			var tagGroupList = $("#J_TagGroupList");
			if(!tagGroupList) return;
		   tagGroupList.delegate(".j_TagGroupSave", "click", function(e) {
				e.preventDefault();
				var tagGroup  = $(this).parents(".j_TagGroup");
				var tagGroupId = tagGroup.attr("data-id");
				var tagGroupName = $.trim(tagGroup.find(".j_TagGroupName").val());
				var tagGroupDesc = $.trim(tagGroup.find(".j_TagGroupDesc").val());
				if (!tagGroupName) {
					alert("标签组名字不能为空~");
					return;
				}
				var saveData = {
					tagTypeId : tagGroupId,
					tagTypeName : tagGroupName,
					tagDescription : tagGroupDesc
				};
				$.get(common.api.saveTagGroup, saveData, function(result) {
					if (!result.isSuccess) {
						alert("发生系统错误，保存标签组失败，请稍后重试~");
						return;
					}
					tagGroup.attr("data-id", result.data);
					var mark = tagGroup.find(".j_TagGroupMark");

					mark.removeClass("tag-group-mark-unsave")
							.addClass("tag-group-mark-saved");
					setTimeout(function() {
								mark.removeClass("tag-group-mark-saved");
							}, 1000);
				}, "json").fail(function() {
							alert("发生系统错误，保存标签组失败，请稍后重试~");
						});

			});
		},
		_initDelTagGroup:function(){
			var tagGroupList = $("#J_TagGroupList");
			if(!tagGroupList) return;
			tagGroupList.delegate(".j_TagGroupDel", "click", function(e) {
				e.preventDefault();
				var tagGroup  = $(this).parents(".j_TagGroup");
				var tagGroupId = tagGroup.attr("data-id");
				var tagGroupName = $.trim(tagGroup.find(".j_TagGroupName").val());
				if (tagGroup.find(".j_TagGroupMark")
						.hasClass("tag-group-mark-unsave")) {
					tagGroup.remove();
					return;
				}

				var delData = {
					tagTypeId : tagGroupId,
					tagTypeName : tagGroupName
				};
				$.get(common.api.delTagGroup, delData, function(result) {
							if (!result.isSuccess) {
								alert("发生系统错误，删除标签组失败，请稍后重试~");
								return;
							}
							tagGroup.remove();
						}, "json").fail(function() {
							alert("发生系统错误，删除标签组失败，请稍后重试~");
						});

			});
		}
		
	};

	return tagGroup;
});