seajs.config({
    // 别名配置
    alias:{
    	// lib
        'jquery':'js/jquery-1.10.2.min.js',
        'form':'js/jquery.form.js',

        // 引用公共组件
        'knockout': 'http://file.showjoy.com/assets/sea-modules/core/knockout/2.3.0/knockout-2.3.0.js',
    },

    vars:{
        
    },

    // 预加载项
    preload:[
    ],

    // 调试模式
    debug: true,

    // 文件编码
    charset:'utf-8'
});