define(function(require, exports, module) {
	var navTree = require("mod/nav");
	var spuPic = require("./spu-pic");
	var spuBase = require("../detail/spu-base");
	var spuScent = require("./spu-scent");
	var spuTag = require("./spu-tag");
	var spuDesc = require("../detail/spu-desc");

	var spuDetail = {
		init : function() {
			var self = this;
			self._initNavTree();
		},
		_initNavTree : function() {
			navTree.select("单品管理");
		},
		_initSubTab : function() {
			$("#J_SpuTab").wijtabs();
		}
	}

	return spuDetail;
});