// 1. 去除移动提示
// 2. 不需要再次请求数据
// 3. datagrid 不需要再次刷新
// 4. 冻结列处理


/* 
 * 1. 直接操作 dom 剪切
 * 2. 操作 columns , 再次加载新的数据的时候，列依旧保持变动后的状态
 *  
 * */

$.extend($.fn.datagrid.methods, {
    columnMoving: function (jq) {
        return jq.each(function () {
            var $target = $(this);
            var $cells = $(this).datagrid('getPanel').find('div.datagrid-header td[field]');

            // draggbable 中的钩子函数 context  为当前拖拽元素
            $cells.draggable({
                revert: true,
                // cursor: 'pointer',
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
                    var fromField = $(source).attr('field');
                    var toField = $(this).attr('field');
                    // 获取 被拖动列的 header
                    var $from = $target.datagrid('getPanel').find('td[field='+ fromField +']');
                    setTimeout(function () {
                        moveField(fromField, toField);
                        
                        // dom 操作 列移动
                        // 将目标列 剪切到当前列的前面
                        $from.each(function () {
                            $(this).insertBefore($(this).parent('tr').find('td[field='+ toField +']'));
                        });

                    }, 0);
                }
            });

            // move field to another location  
            function moveField(from, to) {
                // 获取冻结列
                var gridOptions = $target.datagrid('options');
                var columns = gridOptions.columns;
                var frozencols = $target.datagrid('getColumnFields', true);
                
                if (frozencols.length > 0) {
                    // 冻结列处理
                    if (frozencols.indexOf(from) !== -1 && frozencols.indexOf(to) !== -1) {
                        columns = gridOptions.frozenColumns;
                    }
                }

                var cc = columns[0]
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