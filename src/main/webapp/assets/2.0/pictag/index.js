define(function(require, exports, module) {	return {		init : function() {			var self = this;			self._initSelectTagGroup();		},		_initSelectTagGroup : function() {			$("#J_GroupSelect").wijcombobox({				changed : function() {					$("#J_GroupSelectForm")[0].submit();				}			});		}	};});