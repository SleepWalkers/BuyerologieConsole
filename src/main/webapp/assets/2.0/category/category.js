define(function(require, exports, module) {

  function copyAndSubmitForm($inputs, $form){
    $form.empty();
    $inputs.each(function(index, input){
      $(input).clone().appendTo($form);
    }) 
    $form.submit();
  }

  $(document).ready(function(){
    $('#J_CatSelect').change(function(ev) {
      var link = $(this).find("option:selected").val();
      location.href = link;
    });
    $('#J_CatTable').on('click', '.j_Edit', function(ev){
      ev.preventDefault();
      var $tr = $(ev.currentTarget).parents('tr');
      $tr.addClass('edit-status');
    })

    $('#J_CatTable').on('click', '.j_Cancel', function(ev){
      ev.preventDefault();
      var $tr = $(ev.currentTarget).parents('tr');
      $tr.removeClass('edit-status');
    })
      
    $('#J_CatTable').on('click', '.j_Save', function(ev){
      ev.preventDefault();
      var $tr = $(ev.currentTarget).parents('tr');
      var $inputs = $tr.find('input');
      copyAndSubmitForm($inputs, $('#J_EditForm'));
    })

    $('#J_CatTable').on('click', '.j_Del', function(ev){
      ev.preventDefault();
      var $tr = $(ev.currentTarget).parents('tr');
      //　删除只需要取catid
      var $inputs = $tr.find('input.catid');
      copyAndSubmitForm($inputs, $('#J_DelForm'));
    })

    $('#J_AddRow').on('click', '.j_Add', function(ev){
      ev.preventDefault();
      var $tr = $(ev.currentTarget).parents('tr');
      var $inputs = $tr.find('input');
      copyAndSubmitForm($inputs, $('#J_AddForm'));
    })

    $('#J_Add').click(function(ev){
      ev.preventDefault();
      var $tr = $('#J_AddRow');
      $tr.addClass('edit-status');
      var $inputs = $('#J_AddRow').find('input');
    })
  })
});

