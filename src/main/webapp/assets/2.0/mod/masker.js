define(function(require, exports, module) {
	var Masker = {
		add : function (selector){
			var oSelector = $(selector);
			if(oSelector.find(".j_masker").size()>0){
				return null;
			}
	    	var oMasker = $("<div class='j_masker'>");
	    	var oDiv = $("<div>");
	    	var oIcon = $("<i class='fa fa-spinner fa-spin'>");
	    	oDiv.append(oIcon);
	    	oMasker.append(oDiv);
	    	oSelector.append(oMasker);
			return oMasker;
		},
		remove: function(selector){
			$(selector).find(".j_masker").remove();
		}
	};
	return Masker;
});