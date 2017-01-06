define(function(require, exports, module) {
	var navTree = require("mod/nav");

	var brandDetail = {
		init : function() {
			var self = this;
			self._initNavTree();
		},
		_initNavTree : function() {
			navTree.select("品牌管理");
		}
	};

	return brandDetail;
});