// 这个方法模仿了 es6 中的 模板字符串

String.prototype.format = function (args) {
var result = this;
if(arguments.length > 0) {
if(arguments.length === 1 && typeof(args) === "object") {
for(var key in args) {
if(args[key] != undefined) {
var reg = new RegExp("({"+key+"})","g");
result = result.replace(reg,args[key]);
}
}
}
} else {
for (var i = 0;i<arguments.length;i++) {
if(arguments[i] != undefined) {
var reg = new RegExp("({)"+ i +"(})","g");
result = result.replace(reg,arguments[i]);
}
}
}

return result;
}

var obj = {
"name":"tom",
"age":19,
"gender":"男"
}
var str = "hello,world. i am ${name}，${gender}我今年${age}";

console.log(str);

var str2 = str.format(obj);

console.log(str2);