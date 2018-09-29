// export var firstName = "joe";
// export var lastName = "qiao";
// export var year = 23;
//另一种写法
var firstName = "joe";
var lastName = "qiao";
var year = 23;
export {firstName, lastName, year};
//输出函数和类
function man(){
    console.log(year);
}
//可以改变输出名字  export规定对外接口必须是模块内部变量一一对应关系  不能直接export 1；
export { man};
// export 1; error
// export var m = 1;   必须对应变量   方法也是一样
// 通过接口可以取到实时的值  静态优化  取得的是引用
export var foo = "bar";
setTimeout(() => foo = console.log("baz"), 500);
// export不能放入函数中
// function foo1(){
    // export default "bar"; //error
// }

//默认输出  用在非默认函数也可以  Sex在外部无效 加载是视为匿名函数
// export default function(){
//     console.log("man");
// }
export default function Sex(){
    console.log("BigMan");
}
// export default也可以输出类
// export default class{
//     sarN(){
//         console.log("qiao is joe");
//     }
// }

export const A = 5;