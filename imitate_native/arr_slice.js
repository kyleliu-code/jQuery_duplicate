Array.prototype._slice = function(start,end){

    var newArr = [];
    start = start || 0;
    end = end || this.length;
    for(var i = start ;i < end; i++) {
        newArr[newArr.length] = this[i]; 
    }

    return newArr;
}


var arr = [12,13,14];

;
console.log(arr._slice());
console.log(arr._slice(0,2));
console.log(arr._slice(1));