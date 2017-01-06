define(function(require, exports, module) {
	var common = require("base/common");
	common.renderForm();
	require("tpl");
	require("./info-search-help");

	var relTagTPL = [
			'<div class="tpl-con">',
			'	<li class="j_SpuRelTag">',
			'		<strong class="j_SpuRelTagName spu-rel-tag" data-tagId="${id}">${name}</strong>',
			'		<input class="j_SpuRelTagFactor spu-rel-tag-factor" type="text" value="0"/>',
			'		<b class="j_SpuRelTagMark spu-rel-tag-mark spu-rel-tag-unsave">*</b>',
			'		<button class="j_SpuRelTagSave spu-rel-tag-save" type="button">保存</button>',
			'		<button class="j_SpuRelTagDel spu-rel-tag-del" type="button">删除</button>',
			'	</li>', '</div>'].join('');

	var spuTagList = $("#J_SpuTagList");

	var spuTag = {
		init : function() {
			var self = this;
			self._initSpuTagTree();
			self._initSpuTagManager();
		},
		/**
		 * 标签选择树
		 */
		_initSpuTagTree : function() {
			var spuTagTree = $("#J_SpuTagTree").wijtree({
				nodeExpanding : function(events, data) {
					var node = data.node, o = node.options;
					if (o.hasChildren
							&& node.element.find("li:wijmo-wijtreenode").length == 0) {
						$.get(common.api.tagList, {
									tagTypeId : o.params.id
								}, function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，初始化标签树失败，请稍后刷新页面重试~");
										return;
									}
									
									var tagList = result.data;
									if(!tagList) return;

									var addedNode = {};
									for (var i = 0; i < tagList.length; i++) {
										addedNode.id = tagList[i].id;
										addedNode.text = tagList[i].name;
										addedNode.url = "#";
										addedNode.isTag = true;
										data.node.add(addedNode);
									}
								}, "json").fail(function() {
									alert("发生系统错误，初始化标签树失败，请稍后刷新页面重试~");
								});
					}
				},
				nodeClick : function(e, data) {
					e.preventDefault();
					var opts = data.options;
					var relTagList = $(".j_SpuRelTagName");
					for (var i = 0; i < relTagList.length; i++) {
						if ($(relTagList[i]).attr("data-tagId") == opts.id) {
							alert("该单品已存在此标签，请不要重复添加~");
							return;
						}
					}
					spuTagList.append($(relTagTPL).tmpl({
								id : opts.id,
								name : opts.text
							}));
					common.renderForm();
				}

			});

			spuTagTree.wijtree("add", {
						text : "词库维度",
						hasChildren : true,
						expanded : true,
						url : "javacript:void(0);",
						isTag : false
					});

			var rootNode = spuTagTree.wijtree("findNodeByText", "词库维度");

			$.ajax({
						type : "GET",
						dataType : "json",
						url : common.api.tagGroupList,
						success : function(spuGroupList) {
							for (var i = 0; i < spuGroupList.length; i++) {
								rootNode.add({
											text : spuGroupList[i].typeName,
											hasChildren : true,
											url : "javacript:void(0);",
											params : spuGroupList[i],
											isTag : false
										});
							}
						}
					});
		},
		/**
		 * 打标，删除标签
		 */
		_initSpuTagManager : function() {
			var self = this;
			self._initSpuTagAllDel();
			self._initSpuTagSave();
			self._initSpuTagDel();
			self._initSpuTagFactorChange();
		},
		_initSpuTagSave : function() {
			spuTagList.delegate(".j_SpuRelTagSave", "click", function(e) {
						e.preventDefault();
						var spuRelTag = $(this).parents(".j_SpuRelTag");
						var spuTagFactor = spuRelTag
								.find(".j_SpuRelTagFactor");
						var factor = parseFloat($.trim(spuTagFactor.val()));
						if (!(/^[0-9]+(\.[0-9]+){0,1}$/.test(factor))
								|| isNaN(factor) || factor < 0 || factor > 10) {
							alert("标签权重为0~10之间的浮点数,请修改后重新保存");
							return;
						}
						var saveData = {
								
							spuId : spuTagList.attr("data-spuId"),
							relId : spuRelTag.attr("data-relId"),
							tagId : spuRelTag.find(".j_SpuRelTagName")
									.attr("data-tagId"),
							factor : factor,
							oldSpuId : spuTagList.attr("data-oldSpuId")
						};
						$.get(common.api.saveSpuTag, saveData,
								function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，保存标签失败，请稍后重试~");
										return;
									}
									spuRelTag.attr("data-relId", result.relId);
									spuTagFactor.attr("data-factor",factor);
									var mark = spuRelTag
											.find(".j_SpuRelTagMark");

									mark.removeClass("spu-rel-tag-unsave")
											.addClass("spu-rel-tag-saved");
									setTimeout(function() {
												mark
														.removeClass("spu-rel-tag-saved");
											}, 1000);
								}, "json").fail(function() {
									alert("发生系统错误，保存标签失败，请稍后重试~");
								});

					});
		},
		_initSpuTagDel : function() {
			spuTagList.delegate(".j_SpuRelTagDel", "click", function(e) {
						e.preventDefault();
						var spuRelTag = $(this).parents(".j_SpuRelTag");
						var spuRelId = spuRelTag.attr("data-relId");						
						var delData = {
							spuId : spuTagList.attr("data-spuId"),
							relId : spuRelId,
							tagId : spuRelTag.find(".j_SpuRelTagName")
									.attr("data-tagId"),
							oldSpuId : spuTagList.attr("data-oldSpuId")
						};
						$.get(common.api.delSpuTag, delData, function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，删除标签失败，请稍后重试~");
										return;
									}
									spuRelTag.remove();
								}, "json").fail(function() {
									alert("发生系统错误，删除标签失败，请稍后重试~");
								});

					});
		},
		_initSpuTagAllDel : function() {
			$("#J_DelAllTag").click(function() {
						if (confirm("删除操作无法恢复！是否确认删除该单品下的所有标签？")) {
							var spuId = $(this).attr("data-spuId");
							$.get(common.api.delAllSpuTag, {
										spuId : spuId
									}, function(result) {
										if (!result.isSuccess) {
											alert("发生系统错误，删除所有标签失败，请稍后重试~");
											return;
										}
										spuTagList.empty();
									}, "json").fail(function() {
										alert("发生系统错误，删除所有标签失败，请稍后重试~");
									});
						}

					});

		},
		_initSpuTagFactorChange:function(){
		  spuTagList.delegate(".j_SpuRelTagFactor", "mouseleave", function(e) {
						e.preventDefault();
						var factor = $.trim($(this).val());
						var originalFactor = $(this).attr("data-factor");
						var mark = $(this).parents(".j_SpuRelTag").find(".j_SpuRelTagMark");
						if(factor!=originalFactor){
						   mark.addClass("spu-rel-tag-unsave");
						}else{
							mark.removeClass("spu-rel-tag-unsave");
						}
					});
		}
	};
	spuTag.init();
	return spuTag;
});