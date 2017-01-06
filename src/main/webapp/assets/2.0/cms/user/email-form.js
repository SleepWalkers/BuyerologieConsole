sendEmailTabPanel = function(){	
	
	sendEmailTabPanel.superclass.constructor.call(this, {
		border : true,
		frame : true,
		autoScroll : true,
        activeTab: 0,
		title : '发送邮件',
		items:[{
			title:'单人',
			items :[{
				xtype: 'form',
		        frame:true,
		        height: 700,
		        defaults:{
		        	autoHeight: true
		        },
		        defaultType: 'textfield',
		        items:[{
		            fieldLabel: '邮件地址',
		            name: 'address',
		        	width: 240,
		            allowBlank: false
		        },{
		            fieldLabel: '邮件标题',
		            name: 'title',
		        	width: 340,
		            allowBlank: false
		        },{
		    	    layout: 'fit',
		    	    xtype : 'panel',
		    	    items: {
		    	        xtype: 'htmleditor',
		    	        id: 'singleHtmlEditor',
		    	        name: 'content',
		    	        enableColors: false,
		    	        enableAlignments: false,
		    	        height : 500
		    	    }
		        }],
		        buttons : [{
					text : '发送',
					handler : function(){
						var fp = this.ownerCt.ownerCt;
						var url = '/cms/sendEmail';
			            fp.getForm().submit({
			            	url: url,
			            	method : 'POST',
			            	params: {
			            		type: 'single'
			            	},
			                success: function(form, action) {
			                   Ext.Msg.alert('Success', '发送成功');
			                },
			                failure: function(form, action) {
			                    switch (action.failureType) {
			                        case Ext.form.Action.CLIENT_INVALID:
			                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
			                            break;
			                        case Ext.form.Action.CONNECT_FAILURE:
			                            Ext.Msg.alert('Failure', 'Ajax communication failed');
			                            break;
			                        case Ext.form.Action.SERVER_INVALID:
			                           Ext.Msg.alert('Failure', action.result.msg);
			                   }
			                }
			            });
					}
				}]
			}]
		},{
			title: '多人',
			items:[{
				xtype: 'form',
		        frame:true,
		        height: 700,
		        defaultType: 'textfield',
		        items:[{
		            fieldLabel: '邮件地址(请用;分隔)',
		            name: 'address',
		            xtype: 'textarea',
		        	width: 300,
		        	height: 100,
		            allowBlank: false
		        },{
		            fieldLabel: '邮件标题',
		            name: 'title',
		        	width: 340,
		            allowBlank: false
		        },{
		    	    layout: 'fit',
		    	    xtype : 'panel',
		    	    items: {
			    	    name: 'content',
			    	    id: 'manyHtmlEditor',
		    	        xtype: 'htmleditor',
		    	        enableColors: false,
		    	        enableAlignments: false,
		    	        height : 500
		    	    }
		        }],
		        buttons : [{
					text : '发送',
					handler : function(){
						var fp = this.ownerCt.ownerCt;
						var url = '/cms/sendEmail';
			            fp.getForm().submit({
			            	url: url,
			            	method : 'POST',
			            	params: {
			            		type: 'many'
			            	},
			                success: function(form, action) {
			                   Ext.Msg.alert('Success', '发送成功');
			                },
			                failure: function(form, action) {
			                    switch (action.failureType) {
			                        case Ext.form.Action.CLIENT_INVALID:
			                            Ext.Msg.alert('Failure', 'Form fields may not be submitted with invalid values');
			                            break;
			                        case Ext.form.Action.CONNECT_FAILURE:
			                            Ext.Msg.alert('Failure', 'Ajax communication failed');
			                            break;
			                        case Ext.form.Action.SERVER_INVALID:
			                           Ext.Msg.alert('Failure', action.result.msg);
			                   }
			                }
			            });
					}
				}]
			}]
		}/*,{
			title: '群发',
			items:[{
				xtype: 'form',
		        frame:true,
		        defaults:{
		        	autoHeight: true
		        },
		        defaultType: 'textfield',
		        items:[{
		            fieldLabel: '邮件列表',
		            name: 'address',
		            inputType : 'file',
		            allowBlank: false
		        },{
		            fieldLabel: '邮件标题',
		            name: 'title',
		        	width: 340,
		            allowBlank: false
		        },{
		        	fieldLabel: '邮件内容',
		        	name: 'content',
		        	xtype: 'htmleditor'
		        }]
			}]
		}*/]
	});
};

Ext.extend(sendEmailTabPanel,Ext.TabPanel,{});

Ext.reg('sendEmailTabPanel',sendEmailTabPanel);