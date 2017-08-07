// 获取某一天的前一天 或者 后一天的时间

/*
 * someday 可以为毫秒制或者 new Date() 的返回值
 * preOrNext 取值范围： 1. 'pre'前一天   2. 'next' 后一天
 */
function getTime(preOrNext,someday){
    someday = someday || new Date;
    if(preOrNext == 'pre') 
        return new Date(someday.getTime() - 3600 *24 *1000);
    else if (preOrNext == 'next')
        return new Date(someday.getTime() + 60 * 60 *24 * 1000);
    else 
        return '参数输入格式有误'
}

var pretime = getTime ('pre');
console.log(pretime);

var nexttime = getTime('next');
console.log("nexttime",nexttime);

var augFive = getTime('next',new Date(2017,7,4));

console.log("augFive",augFive);

