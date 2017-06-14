/*
 * Definition: The concat() method is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.

 * Sytax: var new_arr = old_arr.contact(value1[,value2[,...[,valueN]]])
 * 总之，参数可以是数组也可以是数字，可以是多个

 * Parameters: valueN: Arrays and/or values to concatenate into a new array.

 * Return : A new Array instance.
 * 只是对原数组的拷贝，并不影响原数组
 *
 */

var arr = [11, 22, 33, 44];

console.log(arr.concat([], 22, 44));
console.log(arr.concat(55, 66));
console.log(arr.concat({ x: 3 }, [1, 2, 3]));

// return a new Array instance

// function concat() {
//     //arguments iterate
//     var newArr = [];
//     var args = arguments;

//     for (var i = 0, len1 = args.length; i < len1; i++) {
//         if (args[i] instanceof Array) {

//             for (var j = 0, len2 = args[i].length; j < len2; j++) {
//                 newArr[newArr.length++] = arrs[i][j];
//             }

//         } else {
//             newArr[newArr.length++] = arrs[i];
//         }
//     }
//     return newArr;
// }

Array.prototype._concat = function() {
    var newArr = this.slice();
    var args = arguments;

    for (var i = 0, len1 = args.length; i < len1; i++) {

        if (args[i] instanceof Array) {

            for (var j = 0, len2 = args[i].length; j < len2; j++) {
                newArr[newArr.length++] = args[i][j];
            }

        } else {
            newArr[newArr.length++] = args[i];
        }
    }
    return newArr;
}

console.log("----------------------------");


console.log(arr._concat([], 22, 44));
console.log(arr._concat(55, 66));
console.log(arr._concat({ x: 3 }, [1, 2, 3]));