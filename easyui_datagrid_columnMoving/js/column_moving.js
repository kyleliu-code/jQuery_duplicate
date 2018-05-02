$.extend($.fn.datagrid.methods, {
    columnMoving: function (jq) {
        return jq.each(function () {
            var target = this;
            var cells = $(this).datagrid('getPanel').find('div.datagrid-header td[field]');

            // draggbable 中的钩子函数 context  为当前拖拽元素
            cells.draggable({
                revert: true,
                // cursor: 'pointer',
                edge: 5,
                proxy: function (source) {
                    var p = $('<div class="tree-node-proxy tree-dnd-no" style="position:absolute;"/>').appendTo('body');
                    p.html($(source).text());
                    p.hide();
                    return p;
                },
                onBeforeDrag: function (e) {
                    e.data.startLeft = $(this).offset().left;
                    e.data.startTop = $(this).offset().top;
                },
                onStartDrag: function () {
                    $(this).draggable('proxy').css({
                        left: -10000,
                        top: -10000
                    });
                },
                onDrag: function (e) {
                    $(this).draggable('proxy').show().css({
                        left: e.pageX + 15,
                        top: e.pageY + 15
                    });
                    return false;
                }
                // droppable 中 钩子函数 中 context 为 当前坠落区域元素
                // source 为 拖拽 源 元素
            }).droppable({
                accept: 'td[field]',
                onDragOver: function (e, source) {
                    $(source).draggable('proxy').removeClass('tree-dnd-no').addClass('tree-dnd-yes');
                    $(this).css('backgroundColor', '#FFE4C4');
                },
                onDragLeave: function (e, source) {
                    $(this).css('backgroundColor', '#f3f3f4');
                    $(source).draggable('proxy').removeClass('tree-dnd-yes').addClass('tree-dnd-no');
                },
                onDrop: function (e, source) {
                    $(this).css('backgroundColor', '#f3f3f4');
                    var fromField = $(source).attr('field');
                    var toField = $(this).attr('field');
                    setTimeout(function () {
                        moveField(fromField, toField);
                        $(target).datagrid();
                        $(target).datagrid('columnMoving');
                    }, 0);
                }
            });

            // move field to another location  
            function moveField(from, to) {
                var columns = $(target).datagrid('options').columns;
                var cc = columns[0];
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