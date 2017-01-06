PageGrid = function(){	
	var thisGrid = this;
	
	thisGrid.store = new Ext.data.Store({
		proxy : new Ext.data.HttpProxy({
			method : 'GET',
			url: '/cms/getPageList'
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'totalCount',
			root : 'root',
			fields: [{
				'name' : 'id',type:'string'
			},{
				'name' : 'pageName',type:'string'
			},{
				'name' : 'pageEnName',type:'string'
			},{
				'name' : 'title',type:'string'
			},{
				'name' : 'description',type:'string'
			},{
				'name' : 'keywords',type:'string'
			}]
		}),		
		listeners:{
			'update':function(thiz,record,operation){
				var modifiedRecord = thiz.getAt(thiz.indexOf(record)).data;
				if(operation == Ext.data.Record.EDIT){
					var pageId = 0;
					if(modifiedRecord.id){
						pageId = modifiedRecord.id;
					}
					Ext.Ajax.request({
						url:'/cms/publishPage',
						method : 'POST',
						params: { 
							'pageId' : pageId,
							'pageName' : modifiedRecord.pageName,
							'pageEnName' : modifiedRecord.pageEnName,
							'title'  : modifiedRecord.title,
							'description' : modifiedRecord.description,
							'keywords' : modifiedRecord.keywords
						},
						success: function(response, opts) {
							alert("操作成功");

							thiz.commitChanges(); 
							thisGrid.getStore().reload();
							thisGrid.getView().refresh();
	            		},  
	            		failure: function(response, opts) {  
	                		Ext.Msg.alert('错误','server-side failure with status code ' + response.status);  
	                		thiz.rejectChanges();
	            		}
					});
				}
			}
		}
	});
	
	
	this.plugins = new Ext.ux.grid.RowEditor({
		saveText: 'Update'
	});
	
	this.tbar = [{
		text: '新增',
		handler: function(){			
			var pageType = thisGrid.getStore().recordType;
	        var r = new pageType();
	        thisGrid.stopEditing();
	        var x = thisGrid.getStore().data.length;
	        thisGrid.getStore().insert(x, r);
	        thisGrid.plugins.startEditing(x);
		}
	},{
		text: '删除',
		handler: function(){
			var selectedData = thisGrid.getSelectionModel().getSelections()[0].data;

			Ext.Msg.confirm('删除','确定要删除该吗?',function(btn,text){
				if(btn == 'yes'){
					Ext.Ajax.request({
						method : 'GET',
        	    		url : "/cms/deletePage",
						params: { 
							'pageId':selectedData.id,
						},
						success: function(response, opts) {
							thisGrid.getStore().reload();
							thisGrid.getView().refresh();
							alert('删除成功');
        				},
        				failure: function(response, opts) {
        				
        				}
        			});
    			}
    		});
		}
	}]

	
	this.columns = [{
		header:'ID',
		dataIndex:'id',
		width: 150
	},{
		header:'页面中文名',
		dataIndex:'pageName',
		width: 150,
		editor: {
			xtype: 'textfield'
		}
	},{
		header:'页面英文名',
		dataIndex:'pageEnName',
		width: 150,
		editor: {
			xtype: 'textfield'
		}
	},{
		header:'标题',
		dataIndex:'title',
		width: 150,
		editor: {
			xtype: 'textfield'
		}
	},{
		header:'描述',
		dataIndex:'description',
		width: 150,
		editor: {
			xtype: 'textfield'
		}
	},{
		header:'关键词',
		dataIndex:'keywords',
		width: 150,
		editor: {
			xtype: 'textfield'
		}
	}];
	
	this.bbar = new Ext.PagingToolbar({
		store:this.store,
		displayInfo:true,
		pageSize:20
	});
	
	this.store.load({params:{start:0, limit:20}});

	PageGrid.superclass.constructor.call(this, {
		sm : new Ext.grid.CheckboxSelectionModel({
			singleSelect:true
		}),
		title : '页面管理',
		id : 'page-grid',
		closable : true,
		height:400
	});
};

Ext.extend(PageGrid,Ext.grid.GridPanel,{});

Ext.reg('pageGrid',PageGrid);