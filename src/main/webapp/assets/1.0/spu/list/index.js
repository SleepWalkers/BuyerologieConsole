define(function(require, exports, module) {
	var searchForm = require("spu/list/search-form");
	var spuGrid = require("spu/list/spu-grid");
	var common = require("base/common");
	var spuList = {
		init : function() {
			var self = this;
			self._bindSearchBtn();
			self._bindStateSelect();
			self._bindFetchSpuList();
			self._fetchSpuList(true);
		},
		_search: function(keyword){
			spuGrid.dataSource.proxy.options.data.keyword = keyword;
			// 搜索暂时只支持搜索已发布单品
			spuGrid.dataSource.proxy.options.data.isPub = true;
			spuGrid.dataSource.proxy.options.data.newSearch = true;
			spuGrid.grid.wijgrid({
				data : spuGrid.dataSource
			});
			$('#J_Status').addClass('search-status');
		},
		
		_bindSearchBtn: function(){
			var self = this;
			searchForm.searchBtn.click(function(e) {
				e.preventDefault();
				var keyword = $.trim(searchForm.fields.keyword.val());
				self._search(keyword);
			});
		},
		_bindStateSelect:function(){
			var self = this;
			searchForm.stateSelect.change(function(ev){
				var isPub = $(this).children('option:selected').val();
				self._fetchSpuList(isPub);
			});
		},
		_bindFetchSpuList: function(){
			var self = this;
			$('#J_FetchSpuBtn').click(function(ev){
				ev.preventDefault();
				// 刷新页面即可
				location.reload();
			})
		},
		_fetchSpuList: function(isPub){
			var self = this;
			spuGrid.dataSource.proxy.options.data.keyword = "";
			spuGrid.dataSource.proxy.options.data.isPub = isPub;
			spuGrid.dataSource.proxy.options.data.newSearch = true;
			spuGrid.grid.wijgrid({
				data : spuGrid.dataSource
			});
			$('#J_Status').removeClass('search-status');
		}
	};
	return spuList;
});