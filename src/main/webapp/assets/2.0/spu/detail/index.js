define(function(require, exports, module) {
	var spuTag = require("./spu-tag");
	var spuPic = require("./spu-pic");
	var spuComment = require("./spu-comment");
	var spuDesc = require("./spu-desc");
	var spuBase = require("./spu-base");
	var spuScent = require("./spu-scent");

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