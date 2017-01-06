define({
	api : {
		login : window.appRoot + "user/login",
		logout : window.appRoot + "user/logout",
	},
	renderForm : function($container) {
		//knockjs后期渲染
		// datePicker
		$(".bt-date").datetimepicker({
			format: 'yyyy-mm-dd hh:ii:00',
			autoclose: true,
			todayBtn: true,
			language: "zh-CN",
		});
		  
		$(".bt-date-simple").datetimepicker({
			format: 'yyyy-mm-dd 00:00:00',
			minView: 2,
			autoclose: true,
			todayBtn: true,
			language: "zh-CN",
		});
	}
});
