define(function(require, exports, module) {
	var common = require("base/common");

	var dataSource = new wijdatasource({
		dynamic : true,
		proxy : new wijhttpproxy({
					url : common.api.spuSearch,
					dataType : "jsonp",
					data : {
						keyword : ""
					}
				}),
		loading : function(dataSource, requestData) {
			if (!requestData)
				return;
			var paging = requestData.data.paging;
			dataSource.proxy.options.data.page = dataSource.proxy.options.data.newSearch
					? 1
					: (paging.pageIndex + 1);
			dataSource.proxy.options.data.pageNum = paging.pageSize;
			dataSource.proxy.options.data.newSearch = false;
		},
		loaded : function(dataSource) {
		},
		reader : {
			read : function(dataSource) {
				if (!dataSource.data || !dataSource.data.spuList
						|| !dataSource.data.count) {
					dataSource.data = [];
					dataSource.data.totalRows = 0;
				} else {
					var count = parseInt(dataSource.data.count, 10);
					dataSource.data = dataSource.data.spuList;
					dataSource.data.totalRows = count;
				}
				new wijarrayreader([{
							name : 'id',
							mapping : 'id'
						}, {
							name : '英文名',
							mapping : 'enName'
						}, {
							name : '中文名',
							mapping : function(spu) {
								return spu.zhName;
							}
						}, {
							name : '别名',
							mapping : function(spu) {
								var aliasList = spu.aliasList;
								if (!aliasList)
									return "-";
								return aliasList.join(";");
							}
						}, {
							name : '所属品牌',
							mapping : function(spu) {
								var brandVO = spu.brandVO;
								if (!brandVO)
									return "-";
								return brandVO.zhName + " " + brandVO.enName;
							}
						}, {
							name : '性别',
							mapping : function(spu) {
								var sexMap = {
									m : "男",
									fm : "女",
									a : "中性"
								};
								return sexMap[spu.sexType];
							}
						}, {
							name : '浓度',
							mapping : function(spu) {
								if (!spu.scentType)
									return "-";
								return spu.scentType.enName;
							}
						}, {
							name : '香调',
							mapping : function(spu) {
								if (!spu.scentTotal)
									return "-";
								return spu.scentTotal.name;
							}
						}, /*{
							name : '上市时间',
							mapping : function(spu) {
								if (!spu.marketTime)
									return "-";
								return spu.marketTime;
							}
						},*/ {
							name : '标签数',
							mapping : function(spu) {
								return spu.tagNum;
							}
						}, 
						 {
							name : '状态',
							mapping : function(spu) {
								var statusMap = {
										0 : "在编辑",
										1 : "已发布"
								};
								return statusMap[spu.status];
							}
						}]).read(dataSource);
			}
		}

	});

	var config = {
		// allowSorting:true,
		// showFilter : true,
		allowColSizing : true,
		allowColMoving : true,
		allowKeyboardNavigation : true,
		allowPaging : true,
		pageSize : 20,
		nullString : "-",
		// data : dataSource,
		rowStyleFormatter : function(args) {
			if ((args.state & $.wijmo.wijgrid.renderState.rendering)
					&& (args.type & $.wijmo.wijgrid.rowType.data)) {
				args.$rows.css("cursor", "pointer").click(function(e) {
					window.open(window.appRoot + "spu/detail?id="
							+ args.data.id);
				});
			}
		},
		ajaxError : function() {
			//TODO 去掉系统出错提示
			//alert("发生系统错误，查询数据失败，请稍后刷新页面重试~");
		}
	};

	var spuGrid = {
		dataSource : dataSource,
		grid : $("#J_SpuGrid").wijgrid(config)
	};

	return spuGrid;
});