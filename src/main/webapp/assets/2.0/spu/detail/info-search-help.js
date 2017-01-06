define(function(require, exports, module) {
			var infoSearchHelp = {
				init : function() {
					$("#J_InfoSearchHelp button").button().click(function() {
								window.open($(this).attr("data-url"));
							});
				}
			};
			infoSearchHelp.init();
			return infoSearchHelp;

		});