String.prototype._trim = function(){
    return this.replace(/^\s+|\s+$/g,"");
}


String.prototype.__trim = function(){  
    return this.replace(/^\s+(.*?)\s+$/, "$1");  
}  

// String.prototype.___trim = function(){
//     return this.repalce(/^\s+(.*?)\s+$/,"");
// };
var sTest2 = "   this is a new sentence.    ";  
console.log(sTest2._trim());
console.log(sTest2.__trim());
