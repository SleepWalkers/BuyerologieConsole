define(function(require, exports, module) {
	var common = require("base/common");
	require("./info-search-help");
	require("form");

	var spuComment = {
		init : function() {
			var self = this;
			self._initSpuCommentTab();
			self._initWriteComment();
			self._initCommentManage();
		},
		_initSpuCommentTab : function() {
			$("#J_SpuCommentTab").wijtabs();
		},
		_initWriteComment : function() {
			$("#J_CommentDate").wijinputdate({
						showTrigger : true,
						dateFormat : 'yyyy-MM-dd HH:mm:ss'
					});
			$("#J_CommentCtn").wijeditor({
						mode : "simple"
					});
			$("#J_WriteCommentForm").submit(function() {
				var self = this;
				$(self).ajaxSubmit({
							url : common.api.writeComment,
							dataType : "json",
							success : function(result) {
								if (result.isSuccess) {
									alert("发表随机评论成功啦~");
								} else {
									alert("由于" + result.msg
											+ "，发表随机评论失败了，请稍后重试~");
								}
							}
						});
				return false;
			});

		},
		_initCommentManage : function() {
			var dataSource = new wijdatasource({
				dynamic : true,
				proxy : new wijhttpproxy({
							url : common.api.searchComment,
							dataType : "json"
						}),
				loading : function(dataSource, requestData) {
					if (!requestData)
						return;
					var paging = requestData.data.paging;
					dataSource.proxy.options.data.page = paging.pageIndex + 1;
					dataSource.proxy.options.data.pageNum = paging.pageSize;
				},
				reader : {
					read : function(dataSource) {
						if (!dataSource.data || !dataSource.data.data
								|| !dataSource.data.count) {
							dataSource.data = [];
							dataSource.data.totalRows = 0;
						} else {
							var count = parseInt(dataSource.data.count, 10);
							dataSource.data = dataSource.data.data;
							dataSource.data.totalRows = count;
						}

						new wijarrayreader([{
									name : 'id',
									mapping : 'id'
								}, {
									name : '评论预览',
									mapping : 'previewText'
								}, {
									name : '作者',
									mapping : function(comment) {
										if (!comment.userVO
												|| !comment.userVO.username)
											return "-";
										return comment.userVO.username;
									}
								}, {
									name : '发表时间',
									mapping : 'time'
								}, {
									name : '状态',
									mapping : function(comment) {
										var statusMap = {
											"-1" : "已删除",
											"0" : "用户提交",
											"1" : "已发布",
											"2" : "推荐"
										};
										return statusMap[comment.status];
									}
								}, {
									name : '评论操作',
									mapping : function(comment) {
										return '<button type="button" class="del-comment j_DelComment" data-id="'
												+ comment.id + '">删除</button>';
									}
								}]).read(dataSource);
					}
				}

			});

			var config = {
				allowColSizing : true,
				allowColMoving : true,
				allowKeyboardNavigation : true,
				allowPaging : true,
				pageSize : 20,
				nullString : "-",
				ajaxError : function() {
					alert("发生系统错误，查询数据失败，请稍后刷新页面重试~");
				}
			};

			$("#J_CommentSearchBtn").click(function() {
				dataSource.proxy.options.url = common.api.searchComment + "?"
						+ $("#J_CommentManageForm").formSerialize();
				seajs.log(dataSource);
				$("#J_SpuCommentGrid").wijgrid({
							data : dataSource
						});
			});
			$("#J_SpuCommentGrid").wijgrid(config).delegate(".j_DelComment",
					"click", function(e) {
						e.preventDefault();
						var commentId = $(this).attr("data-id");
						$.get(common.api.delComment, {
									commentId : commentId
								}, function(result) {
									if (!result.isSuccess) {
										alert("发生系统错误，删除评论失败，请稍后重试~");
										return;
									}
									$("#J_SpuCommentGrid").wijgrid({
												data : dataSource
											});

								}, "json").fail(function() {
									alert("发生系统错误，删除评论失败，请稍后重试~");
								});

						return false;
					});

		}
	};

	spuComment.init()
	return spuComment;

});