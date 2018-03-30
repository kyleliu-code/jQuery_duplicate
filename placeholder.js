function placeholder (holerValue) {
    $.each(holerValue, function (k , v) {
        var $targetInput  = $('#' + v.id);
        $targetInput
        .css('color', '#777')
        .val(v.value)
        .focus(function () {
            if ($.trim($targetInput.val())=== v.value) $targetInput.val('').css('color', '#000')
        })
        .blur(function(){
              if ($.trim($targetInput.val())=== '') $targetInput.val('').css('color', '#777')
        });
    });
}
// 需要注意的是在想后台提交值的时候注意 提示值删除

// {
//     value:'请输入员工名',
//     id: 'input_els'
// }