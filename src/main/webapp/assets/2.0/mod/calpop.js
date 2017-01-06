define(function(require, exports, module) {
  require('knockout');
  var common = require("base/common");
  var pickerOpts = {
	         changeMonth: true,
	         changeYear: true,
	         dateFormat: "yy-mm-dd"
	};
  $('.mod-calpop').datepicker(pickerOpts);
/*  $('.mod-calpop').each(function(index, item){
    var $input = $(item);
    var $cal = $('<div></div>');
    $cal.insertAfter($input);
    $cal.wijcalendar({ 
        popupMode: true, 
        selectedDatesChanged: function () { 
            var selDate = $(this).wijcalendar("getSelectedDate"); 
            if (selDate) { 
              $input.val(selDate.toDateString()); 
            } 
        } 
    }); 
    $input.click(function () { 
      $cal.wijcalendar("popup", { 
          of: $input
      }); 
    }); 
  }*/
   
});