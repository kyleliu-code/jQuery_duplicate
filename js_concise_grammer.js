// 1. 三元操作符 (用于替换if...else)

const x = 20;

var  answer;
if(x > 10) {
    answer = "is greater";
} else {
    answer = "is lesser";
}

var answer = x > 10 ? "is greater" : "is lesser";


// 2. 短路求值的简写方式
// 设置默认值的时候可以使用
// 从左向右运算 遇到真就停止(还是对if...else的替换)
var variable1,variable2 ;
if(variable1 !== null || variable1 !== undefined || variable1 !== "") {
    variable2 = variable1;
}else {
    variable2 = "news";
}

var  variable2 = variable1 || "news";

// 3.  声明变量的简写

// let x;
let y;
let z = 3;

//var x,y,z=3;

// 4. if 存在的简写方法
 
if(likeJavaScript === true) {

}

if(likeJavaScript){}
// 个人建议对于非bool的 使用 双否定
// if(!!likeJavaScript){}

if(a !== true) { 
    // do somethind
}

if(!a){}


// 5. js 循环的简写方法

for(let i = 0;i<allImgs.length;i++) {
// do somethings
}

// es6 的语法了
for(let index in allImgs) {
    // do somethings
}
// forEach
// 补充一点

for(var i=0,len = arr.length;i<len;i++){
    //当arr.length 很长需要很深的原型链访问的时候
} 

var i = 0,len = arr.length;
for(;i< len;i++){ 
    // do something
}

// 6. 十进制指数

for(let i = 0;i < 10000; i++){
    // do something
}

for(let i = 0; i < 1e4;i++){}

// 7. 对象属性简写
// 如果属性名与key名相同，则可以采用ES6的方法：
const obj = {x:x,y:y};

const obj2 = {x,y};


// 8. es6 箭头函数
// 

function sayHello(name){
    console.log("hello",name);
}


setTimeout(function(){
    console.log("Loaded");
},10);

list.forEach(function(value,key,arr){
    console.log(value)
};

sayHello = name => console.log("hello",name);

setTimeout(()=>console.log("Loaded"),10);

list.forEach(v =>console.log(v));

// 9. 隐士返回值简写
// 经常使用return语句来返回函数最终结果，一个单独语句的箭头函数能隐式返回其值（函数必须省略{}为了省略return关键字）

// 为返回多行语句（例如对象字面表达式），则需要使用()包围函数体。
// 主要还是针对于 es6 的箭头函数

function calcCircumference(diameter) {
    return Math.PI * diameter;
}

var func = function (){
    return {foo:1};
}

// 箭头函数声明需要先声明后使用
calcCircumference = diameter => (Math.PI * diameter);

var func = ()=>({foo :1});

// 提醒一点： 就是尽量直接 return 一个表达式，简洁



// 10. es6 中形参默认值

function volume(l,w,h){
  w = w || 3;
  h = h || 4;
  // 以前默认值是写在 函数体内的
  // if(w === undefined) {
  //   w = 3;
  // }
  // if(h === undefined) {
  //   h = 4;
  // }
  return l * w * h;
}

volume = (l,w = 3, h = 4) => {
    return l * w * h;
}

volume = (l,w = 3, h = 4) => (l * w * h);

// 11. 模板字符串
// 

var db = "http://" + host + ":" + port + "/" +database;

const db2 = `http://${host}:${port}/${database}`;

const lorem = 'Lorem ipsum dolor sit amet, consectetur\n\t'
    + 'adipisicing elit, sed do eiusmod tempor incididunt\n\t'
    + 'ut labore et dolore magna aliqua. Ut enim ad minim\n\t'
    + 'veniam, quis nostrud exercitation ullamco laboris\n\t'
    + 'nisi ut aliquip ex ea commodo consequat. Duis aute\n\t'
    + 'irure dolor in reprehenderit in voluptate velit esse.\n\t'
// 使用反引号，则可以达到简写作用：

const lorem = `Lorem ipsum dolor sit amet, consectetur
    adipisicing elit, sed do eiusmod tempor incididunt
    ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse.`

// 12. 扩展运算符简写
// 感觉像 es6 的语法

const odd = [1,3,5];
const nums = [2,4,6].concat(odd);

var  arr = [1,2,3,4];
const arr2 = arr.slice();

const odd2 = [1,3,5];
const nums2 = [1,3,5,...odd];

const arr3 = [...arr];// 这样就可以直接复制一个数组的全部内容
// 可以在数组中任意位置插入，比concat() 牛逼
const odd = [1, 3, 5 ];
const nums = [2, ...odd, 4 , 6];

// 也可以使用扩展运算符解构

const {a,b,...z} = {a:1,b:2,c:3,d:4};
console.log(a) // 1
console.log(b) // 2
console.log(z) // { c: 3, d: 4 }

// 13. 强制参数简写
// JavaScript中如果没有向函数参数传递值，则参数为undefined。为了增强参数赋值，可以使用if语句来抛出异常，或使用强制参数简写方法。

// 妙哉
function foo(bar) {
    if(bar === undefined) {
        throw new Error("Missing parameter");
    }
    return bar;
}

mandatory = () => {
    throw new Error("Missing parameter");
}

foo = (bar = mandatory())=> {
    return bar;
}

// 14. Array.find 简写
// 还是 es6 箭头函数的简写
const pets  = [
 { type: 'Dog', name: 'Max'},
  { type: 'Cat', name: 'Karl'},
  { type: 'Dog', name: 'Tommy'},
];

function findDog(name){
    for(let i = 0;i < pets.length;i++) {
        if(pets[i].type === 'Dog' && pets[i].name === name){
            return pets[i];
        }
    }
}

// arr.find 应该是返回符合条件 的数组元素
pet = pets.find(pet=>{
    return pet.type === "Dod" && pet.name === "Tommy";
})

pet = pets.find(pet=>(pets.type === "Dog" && pet.name === "Tommy"));

// 15 . 双重非位运算简写
// 数字取整的运算效率最高
~~4.9 === 4  //true
