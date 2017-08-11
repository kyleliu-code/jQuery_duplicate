// arr_indexOf 模拟实现（兼容处理）

Array.prototype._indexOf = function (searchValue,fromIndex) {
    for (var i = fromIndex || 0,j = this.length;i < j; i++) {
        if (searchValue == this[i]) {
            return i;
        }
    }
    return -1;
}

// var arr = [1,2,3];
// var arr2 = [1,,1,1,1];
// console.log(arr._indexOf(2));
// console.log(arr2._indexOf(1));
// console.log(arr._indexOf(4));