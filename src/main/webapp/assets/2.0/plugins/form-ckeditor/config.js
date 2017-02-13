/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	config.language = 'zh-cn';
	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.extraPlugins = 'lineheight';
	config.toolbarGroups = [
	    { name: 'clipboard',   groups: [ 'undo' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups : [ 'Bold','Italic','Underline','Strike','Subscript','Superscript','-','RemoveFormat' ] },  
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
	    { name: 'styles', groups : [ 'Styles','Format','Font','FontSize','lineheight' ] },  
	    { name: 'colors', groups : [ 'TextColor','BGColor' ] }
	];

	config.filebrowserImageUploadUrl= "/api/image/ckeditor/upload"; //待会要上传的action或servlet

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';
    config.fontSize_sizes ='8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px'

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Simplify the dialog windows.
	config.removeDialogTabs = 'image:advanced;link:advanced';
};
