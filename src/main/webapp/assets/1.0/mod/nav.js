define(function(require, exports, module) {
	var config = {
		nodes : [ {
			text : "尚妆管理中心",
			expanded : true,
			navigateUrl : "javascript:void(0);",
			nodes : [{
				text : "货品中心",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [{
					text : "货品搜索",
					navigateUrl : window.appRoot + "search"
				},{
					text : "团购搜索",
					navigateUrl : window.appRoot + "search/activity"
				}, {
					text : "货品信息管理",
					navigateUrl : window.appRoot + "spu/spuList"
				}, {
					text : "品牌管理",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [ {
						text : "品牌列表",
						navigateUrl : window.appRoot+ "brand"
					},  {
						text : "品牌地区",
						navigateUrl : window.appRoot + "brand/areas"
					}]
				}, {
					text : "模板管理",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [ {
						text : "类目模板",
						navigateUrl : window.appRoot + "cate/template"
					},  {
						text : "属性模板",
						navigateUrl : window.appRoot + "prop/mainpropnames"
					}]
				},{
					text : "类目",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [{
						text : "类目管理",
						navigateUrl : window.appRoot + "cate"
					}]
				}]
			},{
				text : "仓储系统",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [ {
					text : "仓库管理",
					navigateUrl : window.appRoot + "warehouse/list"
				},{
					text : "采购管理",
					navigateUrl : window.appRoot + "purchase/order/list"
				},{
					text : "出入库管理",
					navigateUrl : window.appRoot + "warehouse/warehousevoucher/index"
				},{
					text : "库位更改记录",
					navigateUrl : window.appRoot + "warehouse/wareLocationRecords"
				},{
					text : "货品列表",
					navigateUrl : window.appRoot + "warehouse/skus"
				},{
					text : "发货中心",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [{
						text : "快递单打印",
						navigateUrl : window.appRoot + "logistics/print"
					},{
						text : "发货",
						navigateUrl : window.appRoot + "logistics/helper"
					},{
						text : "缺货单",
						navigateUrl : window.appRoot + "logistics/notStock"
					}]
				}, {
					text : "库存监控中心",
					navigateUrl : window.appRoot + "monitor/batchMonitor"
				}]
			},{
				text : "交易中心",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [{
					text : "订单管理",
					navigateUrl : window.appRoot + "trade/order/list"
				},{
					text : "库存管理",
					navigateUrl : window.appRoot + "spu/inventory/list"
				},{
					text : "物流模板管理",
					navigateUrl : window.appRoot + "express/template"
				},{
					text : "物流公司管理",
					navigateUrl : window.appRoot + "express/company"
				},{
					text : "正品底价",
					navigateUrl : window.appRoot + "vip/bottomPriceList"
				}]
			},{
				text : "营销中心",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [{
					text : "活动组件",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [{
						text : '活动管理',
						navigateUrl : "javascript:void(0);",
						expanded : true,
						nodes : [{
								
								text : '专题类',
								navigateUrl : window.appRoot + "activity/topic/list"
							},
							{
								text : '秒杀类',
								navigateUrl : window.appRoot + "activity/seckill/list"
							
						  },{
								text : '团购类',
								navigateUrl : window.appRoot + "activity/groupon/list"
							
						  },{
								text : '抽奖类',
								navigateUrl : window.appRoot + "activity/lottery/list"
							
						  },{
								text : '优惠类',
								navigateUrl : window.appRoot + "activity/preferential/list"
							
						  }]
						
					},  {
						text : '奖品管理',
						navigateUrl : window.appRoot + "gift"
					},{
						text : '人群管理',
						navigateUrl : window.appRoot + "crowd"
					},{
						text : '活动商品',
						navigateUrl : window.appRoot + "activity/productList"
					}]
				},{
					text : "投票系统",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [{
						text : "世界杯赛程",
						navigateUrl : window.appRoot + "vote/worldCupVoteActivity",
				     },{
				    	 text : "世界杯球队",
						 navigateUrl : window.appRoot + "vote/worldCupVoteObject", 
				     },{
				    	 text : "赢球查询",
						 navigateUrl : window.appRoot + "vote/winStatistics", 
				     }]
				}
				,{
					text : "发放组件",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [{
				    	 text : "奖品码发放",
						 navigateUrl : window.appRoot + "codetype/", 
				     }]
				},{
					text : "消息中心",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [{
				    	 text : "邮件管理",
						 navigateUrl : window.appRoot + "market/message/email/emailList", 
				     },
				     {
				    	 text : "短信管理",
						 navigateUrl : window.appRoot + "market/message/sms/list", 
				     },
				     {
				    	 text : "站内信",
						 navigateUrl : window.appRoot + "market/marketMessage/messageList", 
				     },
				     {
				    	 text : "发货短信管理",
						 navigateUrl : window.appRoot + "market/message/sms/delivery", 
				     }
				     ]
				}
				]
			},{
				text : "用户中心",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [{
					text : "权限管理",
					navigateUrl : window.appRoot+"user/authority"
				},{
					text : "用户信息",
					navigateUrl : "javascript:void(0);",
					expanded : true,
					nodes : [{
						text : "手机解绑",
						navigateUrl : window.appRoot+"user/associatePhone"
					},{
						text : "QA工具",
						navigateUrl : window.appRoot+"trade/config"
					}]
				}]
			},{
				text : "数据中心",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [{
					text : "数据查看",
					navigateUrl : window.appRoot+"data/list" 
				}]
			},{
				text : " 评论管理",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [{
					text : "评论加精",
					navigateUrl : window.appRoot+"comment/commentList" 
				},{
					text : "评论录入",
					navigateUrl : window.appRoot+"comment/addComment" 
				}]
			},{
				text : "用户帮助中心",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [{
					text : "问题类目管理",
					navigateUrl : window.appRoot + "workorder/questionCategory/list"
				},{
					text : "工单管理",
					navigateUrl : window.appRoot + "workorder/list"
				},{
					text : "前台展示",
					navigateUrl : window.appRoot + "workorder/category"
				}]
			},{
				text : "积分管理",
				navigateUrl : "javascript:void(0);",
				expanded : true,
				nodes : [{
					text : "积分管理",
					navigateUrl : window.appRoot + "point/pointAdd",
			     }]
			},{
				text : "CMS",
				navigateUrl : "/cms/page/list"
			},{
				text : "上传图片",
				navigateUrl : "/image"
			}]
		}]
	};
	var nav = $("#mod-nav-navTree").wijtree(config);

	var navTree = {
		select : function(text) {
			nav.wijtree("findNodeByText", text).option("selected", true);
		}
	};

	return navTree;
});