define(function(require, exports, module) {
	var spuBase = require("./spu-base");
	var common = require("base/common");
	common.renderForm();

	var spuDetail = {
		init : function() {
			var self = this;
			self._initSubTab();
		},
		_initSubTab : function() {
			$("#J_SpuTab").wijtabs();
		}
	}

	return spuDetail;
});