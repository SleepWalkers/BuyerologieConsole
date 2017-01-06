seajs.config({
    // 别名配置
    alias:{
    	// lib
        'jquery':'lib/jquery/jquery-1.8.2.min.js',
        'tpl':'lib/jquery/jquery.tmpl.js',
        'form':'lib/jquery/jquery.form.js',
        'jquery-ui':'lib/jquery-ui/jquery-ui-1.9.1.custom.min.js',
        'wijmo-themes':'lib/wijmo/themes/arctic/jquery-wijmo.css',
        'wijmo-css':'lib/wijmo/jquery.wijmo-complete.all.2.3.6.min.css',
        'wijmo-open':'lib/wijmo/jquery.wijmo-open.all.2.3.6.min.js',
        'wijmo-complete':'lib/wijmo/jquery.wijmo-complete.all.2.3.6.min.js',

        // 引用公共组件
        'knockout': 'http://file.showjoy.com/assets/sea-modules/core/knockout/2.3.0/knockout-2.3.0.js',
    },

    vars:{
        
    },

    // 预加载项
    preload:[
      'wijmo-themes',
    ],

    // 调试模式
    debug: false,

    // 文件编码
    charset:'utf-8'
});