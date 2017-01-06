define(function(require, exports, module) {
	var common = require("base/common");
	require("tpl");
	require("./info-search-help");

	var spuScentTPL = [
			'<div>',
			'	<li class="j_SpuScent" data-scentId = "${id}">',
			'		<strong class="scent-name">${name}</strong>',
			'		<a href="javascript:void(0)" class="j_SpuScentDel spu-scent-del">&times;</a>',
			'	</li>', '</div>'].join('');

	var spuScent = {
		init : function() {
			var self = this;
			self._initScentSelect();
			self._initDelScent();
			self._initScentDesc();
		},
		_initScentSelect : function() {
			var proxy = new wijhttpproxy({
						url : common.api.searchScent,
						dataType : "json",
						data : {
							keyword : ""
						},
						key : 'data'
					});

			var myReader = new wijarrayreader([{
						name : 'label',
						mapping : function(item) {
							return item.name;
						}
					}, {

						name : 'value',
						mapping : "item"
					}]);

			var datasource = new wijdatasource({
						reader : myReader,
						proxy : proxy
					});
			$(".j_ScentSelect").wijcombobox({
				data : datasource,
				showTrigger : false,
				minLength : 0,
				search : function(e, obj) {
					obj.datasrc.proxy.options.data.keyword = obj.term.value;
				},
				select : function(e, item) {
					var scentItem = item.value;
					var scentCon = $(this).parents(".j_SpuScentCon");
					var spuId = scentCon.attr("data-spuId");
					var type = scentCon.attr("data-type");
					var saveData = {
						spuId : spuId,
						scentId : scentItem.id,
						type : type
					};

					$.get(common.api.publishScentRel, saveData,
							function(result) {
								if (!result.isSuccess) {
									alert("发生系统错误，添加香调失败，请稍后重试~");

								} else {
									//清空输入框
									e.currentTarget.value = '';
									var scentList = scentCon
											.find(".j_ScentList");
									scentList.append($(spuScentTPL)
											.tmpl(item.value));

								}
							}, "json").fail(function() {
								alert("发生系统错误，添加香调失败，请稍后重试~");
							});
				}
			});
		},
		_initDelScent : function() {
			var spuScentManage = $("#J_SpuScentManage");
			spuScentManage.delegate(".j_SpuScentDel", "click", function(e) {
						var scentCon = $(this).parents(".j_SpuScentCon");
						var scent = $(this).parents(".j_SpuScent");
						var scentId = scent.attr("data-scentId");
						seajs.log(scentId);
						var spuId = scentCon.attr("data-spuId");
						var type = scentCon.attr("data-type");
						var delData = {
							spuId : spuId,
							scentId : scentId,
							type : type
						};
						$.get(common.api.delScentRel, delData,
								function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，删除香调失败，请稍后重试~");
									} else {
										scent.fadeOut(300, function() {
													scent.remove();
												});

									}
								}, "json").fail(function() {
									alert("发生系统错误，删除香调失败，请稍后重试~");
								});
					});
		},
		_initScentDesc : function() {
			$("#J_ScentDescForm").submit(function() {
				var self = this;
				$(self).ajaxSubmit({
							url : common.api.publishSpuScent,
							dataType : "json",
							success : function(result) {
								if (result.isSuccess) {
									alert("保存香调描述成功啦~");
								} else {
									alert("由于" + result.msg
											+ "，保存香调描述失败了，请稍后重试~");
								}
							}
						});
				return false;
			});
		}

	};
	spuScent.init();
	return spuScent;
});