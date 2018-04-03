
var conincome = '客户代码 员工号'; //示例
var incomearr = [];

function init() {
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
}

function batimportcustomer(_this) {
    $(_this).attr("disabled", true);
    setTimeout(function() {
        $(_this).attr("disabled", false);
    }, 2000);
    //每次导入400
    var _per = 400;
    var num = Math.ceil(incomearr.length / _per);

    for (var i = 1; i <= num; i++) {
        var _bflag = (num == i) ? true : false;
        var _customerarr = incomearr.slice((i - 1) * _per, i * _per);
        customerimport(_customerarr, _bflag);
    }
}

//批量导入
function customerimport(customerarr, bflag) {
    $.ajaxHandler({
        url: App_Config.JunhongDb + "/AjaxMappingHandler.aspx",
        urlType: 'CTC01804003',
        model: function() {
            var obj = {};
            obj.id = $.getPara('id');
            obj.opttype = 1;
            obj.contact_str = customerarr.join(',');
            return $.toJSON(obj);
        },
        success: function(data) {
            if (bflag) {
                alert(data);
                parent.cust_query.pageinfos.query.search();
                parent._closePage();
            }
        }
    });
}
var _layer;

function customerincome() {
    var html = [];
    html.push('<div style="text-align:center; margin-top:30px;">');
    html.push('<lable>共添加了</lable>' + incomearr.length + '<lable>条客户代码</lable>');
    html.push('</div>');
    html.push('<div style="text-align:center; margin-top:50px;"><input type="button" class="btn btn-blue" value="确定导入"  onclick="batimportcustomer(this);"/><input type="button" class="btn btn-default" value="取消导入" onclick="_layer.close();"/></div>');

    _layer = openlayer({ title: '请确认导入数据', html: html.join(''), width: 300, height: 150 });
}