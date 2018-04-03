## 限制 文本域输入的案例

应该说是从两个方面进行限制的

1. 从不准输入的字符内容
2. 我们需要哪些输入的内容

通过这两个方面的结合，限制了文本域的输入

### 不准输入的字符内容

> 通过keyup event 限制了我们不能输入的内容

```js
$('#txtimport').bind('focus', function() {
        if ($('#txtimport').val() == conincome) {
            $('#txtimport').val('');
        }
    }).bind('blur', function() {
        if ($('#txtimport').val() == '') {
            $('#txtimport').val(conincome);
        }
    }).bind('keyup', function() {
        $(this).val($(this).val().replace(/[^\d\.\[\]_ \r\n]/g, ''));
    });
```

### 我们需要哪些内容
> 通过正则表达式知道我们需要哪些内容

```js
$('#btnimport').bind('click', function() {
    if ($('#txtimport').val() == '') {
        alert('导入数据不能为空');
    } else {
        incomearr.length = 0;
        var rows = $('#txtimport').val().split('\n');
        if (rows.length > 0) {
            $.each(rows, function(i, item) {
                var cols = item.match(/(\d{4,})/g);
                if (cols && cols.length > 0) {
                    incomearr.push(cols.join('|'));
                }
            });
        }
        if (incomearr.length == 0) {
            alert('数据格式不正确');
        } else {
            customerincome();
        }
    }
});
```