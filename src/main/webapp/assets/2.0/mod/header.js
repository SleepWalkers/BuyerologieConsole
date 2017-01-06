define(function(require, exports, module) {
			var common = require("base/common");
			var header = {
				init : function() {
					$(".j_UserLogout").click(function() {
								$.ajax({
											url : common.api.logout,
											dataType : "json",
											success : function(data) {
												if (data.isSuccess) {
													document.location.href =  window.appRoot+"login";
												}
											}
										});
							});
				}
			};
			header.init();
			return header;
		});