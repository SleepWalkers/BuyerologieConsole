define({
			api : {
				spuSearch : window.appRoot + "search/spu",
				tagGroupList : window.appRoot + "tag/getTagTypeList",
				tagList : window.appRoot + "tag/getTagList",
				saveSpuTag : window.appRoot + "spu/setSpuTag",
				delSpuTag : window.appRoot + "spu/deleteSpuTag",
				delAllSpuTag:window.appRoot +"spu/deleteAllSpuTag",
				login : window.appRoot + "user/login",
				logout : window.appRoot + "user/logout",
				writeComment : window.appRoot + "spu/publishRandomComment",
				searchComment:window.appRoot+"spu/searchComment",
				delComment:window.appRoot+"spu/deleteComment",
				publishIntro : window.appRoot + "spu/publishIntro",
				publishNewBase : window.appRoot + "spu/publishNewBasic",
				publishBase : window.appRoot + "spu/publishBasic",
				searchScent:window.appRoot+"spu/searchScent",
				publishScentRel:window.appRoot+"spu/publishScentRel",
				delScentRel:window.appRoot+"spu/deleteScentRel",
				publishSpuScent:window.appRoot+"spu/publishScent",
				setTagOfPicTag:window.appRoot+"picTag/setTagOfPicTag",
				saveTagGroup:window.appRoot+"tag/publishTagType",
				delTagGroup:window.appRoot+"tag/deleteTagType",
				publishTag:window.appRoot+"tag/publishTag",
				delTag:window.appRoot+"tag/deleteTag",
				delTagOfPicTag:window.appRoot+"picTag/deleteTagOfPicTag",
				saveScentTotal:window.appRoot+"scent/publishScentTotal",
				saveScentGroup:window.appRoot+"scent/updateGroup",
				delScentTotal:window.appRoot+"scent/deleteScentTotal",
				publishScent:window.appRoot+"scent/publishScent",
				delScent:window.appRoot+"scent/deleteScent",
				changeSpuImage: window.appRoot + "spu/changeSpuImage"
			},
			renderForm : function($container) {
				$container.find(":input[type='text'],:input[type='password']")
						.wijtextbox();
				$container.find("select").wijcombobox();
				$container.find(":input[type='radio']").wijradio(); 
				$container.find(":input[type='checkbox']").wijcheckbox(); //TODO 多次渲染之后无法选中
				$container.find(":input[type='button'],:input[type='submit']").button();
				$container.find("button").button();
			}
		});
