//  Kyle 列拖动
$.extend($.fn.datagrid.methods, {
    columnMoving: function (jq, grid) {
        return jq.each(function () {
            var $target = $(this);
            var $cells = $(this).datagrid('getPanel').find('div.datagrid-header td[field]');

            // draggbable 中的钩子函数 context  为当前拖拽元素
            $cells.draggable({
                revert: true,
                edge: 5,
                proxy: function (source) {
                    var p = $('<div class="tree-node-proxy tree-dnd-no" style="position:absolute;"/>').appendTo('body');
                    p.html($(source).text());
                    p.hide();
                    return p;
                }
                // droppable 中 钩子函数 中 context 为 当前坠落区域元素
                // source 为 拖拽 源 元素
            }).droppable({
                accept: 'td[field]',
                onDragOver: function (e, source) {
                    $(this).css('backgroundColor', '#FFE4C4');
                },
                onDragLeave: function (e, source) {
                    $(this).css('backgroundColor', '#f3f3f4');
                },
                onDrop: function (e, source) {
                    $(this).css('backgroundColor', '#f3f3f4');
                    var from = $(source).attr('field');
                    var to = $(this).attr('field');
                    var checkboxList = ["ckl", "ck1"];
                    // 三 、checkbox 不可调整
                    if (checkboxList.indexOf(from) !== -1 || checkboxList.indexOf(to) !== -1) {
                        return;
                    }
                    var $from = $target.datagrid('getPanel').find('td[field=' + from + ']');

                    // 一、双表头处理
                    var columns = $target.datagrid('options').columns;
                    if (columns.length > 1) {
                        var c_two = [];
                        $.each(columns[1], function (k, v) {
                            c_two.push(v.field);
                        });

                        // 1. 子表头拖拽无效, 进入也无效
                        if (c_two.indexOf(from) !== -1 || c_two.indexOf(to) !== -1) {
                            return;
                        }

                        // 2. 父表头拖拽无效
                        // 2. 父表头不能拖拽
                        var c_parent = [];
                        $.each(columns[0], function (k, v) {
                            if (typeof v.colspan !== 'undefined' && v.colspan > 0) {
                                c_parent.push(v.field);
                            }
                        });
                        if (c_parent.indexOf(from) !== -1 || c_parent.indexOf(to) !== -1) {
                            return;
                        }
                    }


                    // grid options 选项修改，loadData 时候有用
                    moveField(from, to);

                    // dom 操作 列移动
                    $from.each(function () {
                        $(this).insertBefore($(this).parent('tr').find('td[field=' + to + ']'));
                    });
                }
            });
            // move field to another location  
            function moveField(from, to) {
                // 获取冻结列
                var gridOptions = $target.datagrid('options');
                var columns = gridOptions.columns;
                var frozencols = $target.datagrid('getColumnFields', true);

                // 二、冻结列 处理
                if (frozencols.length > 0) {

                    if (frozencols.indexOf(from) !== -1 && frozencols.indexOf(to) !== -1) {
                        // 1. 冻结列之间的移动
                        columns = gridOptions.frozenColumns;
                    } else if (frozencols.indexOf(from) === -1 && frozencols.indexOf(to) === -1) {
                        // 2. 非冻结列 之间可以移动  
                        // 什么都不用做
                    } else {
                        // 3. 冻结列和 非冻结之间 不 可以移动 应该 return
                        return;
                    }
                }

                var cc = columns[0];
                // 去掉 columns 中的 field 对应对象
                var c = _remove(from);
                if (c) {
                    _insert(to, c);
                }

                function _remove(field) {
                    for (var i = 0; i < cc.length; i++) {
                        if (cc[i].field == field) {
                            var c = cc[i];
                            cc.splice(i, 1);
                            return c;
                        }
                    }
                    return null;
                }

                function _insert(field, c) {
                    var newcc = [];
                    for (var i = 0; i < cc.length; i++) {
                        if (cc[i].field == field) {
                            newcc.push(c);
                        }
                        newcc.push(cc[i]);
                    }
                    columns[0] = newcc;
                }
            }
        });
    }
});