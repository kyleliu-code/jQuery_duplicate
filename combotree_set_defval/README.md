# easyui combotree 数据加载 和设置默认值问题

## combotree 设置默认值

### 方法1： 在声明树的时候

```js
$('#tt').combotree({
    textField: 'text',
    valueField: 'id',
    value: 111,
}
```

### 方法2： setValue方法

> 使用此种方法需要注意的是 一定要在 combotree panel dom 对象加载完成后才能使用，不然会出错

```js
$('#tt').combotree({
    onLoadSuccess: function (node, data) {
        $('#tt').combotree('setValue', 111);
    }   
}

```

#### 特别注意的情况

> 此种情况下， 会出现设置的默认值为 key 值（出错了）

> 原因在于我们设置值的时候， tree panel dom 对象还未生成

```js
$('#tt').combotree({
    url: 'tree_data1.json',
    method: 'get',
    // data: comboreeData,
    label: 'Select Node:',
    labelPosition: 'top',
    onBeforeSelect: function (node) {
        // 只能选中叶子节点
        if (!$(this).tree('isLeaf', node.target)) {
            return false;
        }
    },
    onSelect: function () {
        alert('selcet!')
    },
    onClick: function () {
        alert('click');
    }
});

$('#tt').combotree('setValue', 111);
// Kyle: 设置默认值 方法 3
// 需要用在 tree panel dom 加载完成后 
// 1. 比如在使用 异步加载的时候，就会遇到这个问题 ，本地数据没有加载
// 或者说 panel 中没有对应的子节点的时候就会出现这个问题

```
> 我们必须保证 设置默认值是在异步加载数据之后（进一步而言是在 tree加载数据之后）

## select 事件触发问题

在 easyui 1.4 版本中 `$('#left_tree').combotree('setValue', 111);` 会触发 combotree 的onSelect 事件

在 easyui 1.5 版本中 setValue 不会触发 onSelect 事件， 需要手动去触发 onSelect 事件， 如： 

```js

  // 主动触发了 select 事件, 在 easyui 1.4 中 setValue 会触发 onSelect 事件   
    var tree = $('#left_tree').combotree('tree');
    var node = tree.tree('find', 111);
    tree.tree('select', node.target);

    // set left_tree defval
    $('#left_tree').combotree('setValue', 111);

```

## 在 我们的 bst 项目中

需求图

需要在分支机构选中不同的营业部的时候，对应的团队成员 tree 是不同的选项（也就是说，选中营业部的时候，团队成员的树需要请求数据，重新加载数据）

主要实现思路：

1. 机构树加载的时候初始化默认值： 

```js
window.flag = true;
$('#tt').combotree({
    // ...
    valueField: 'id',
    value: 111
});
```

2. 机构树 onSelect 事件触发的时候：复写 团队成员的 options 对象

> 只有第一次会使用默认值

```js
$(#'org').combotree({
    // ...
    onSelect: function () {
        // 复写团队成员 tree 的声明
        // 
        if (!window.flag) {
            $('#tt').combotree({
                        value: ''
            });
            window.flag = false;
        }
    }
});
```
