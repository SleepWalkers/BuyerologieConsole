define(function(require, exports, module) {
			var common = require("base/common");
			var homepage = {
				init : function() {
					var self = this;
					$(".j_LoginBtn").click(function(e) {
								e.preventDefault();
								var userName = $.trim($(".j_UserName").val());
								if (!userName) {
									self.showErrMsg("用户名/邮箱不能为空");
									return;
								}
								var userPsw = $.trim($(".j_UserPsw").val());
								if (!userPsw) {
									self.showErrMsg("密码不能为空");
									return;
								}
								var autoLogin = $(".j_AutoLogin")[0].checked;
								$.post(common.api.login, {
											userName : userName,
											password : userPsw,
											autoLogin : autoLogin
										}, function(data) {
											if (data.isSuccess) {
												document.location.href = window.appRoot+"spu/spuList";
											} else {
												self.showErrMsg(data.msg);
											}
										}, "json").fail(function() {
											self.showErrMsg("由于网络原因，登录失败了T_T");
										});
							});

				},
				showErrMsg : function(msg) {
					$(".j_LoginErrMsg").html(msg).show().delay(500).fadeOut();
				}
			}
			return homepage;

		});