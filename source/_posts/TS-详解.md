---
title: TS 详解
date: 2020-08-01 15:13:07
tags: TS
---

# 参数类型注解 
function greeter(person: string) {
  return "Hello, " + person;
}
此刻表明 只能接受 greeter("字符串类型") 否则会报错

# 接口方式定义注解
* 我们想要描述一个参数是一个对象且拥有两个属性 firstName && lastName
interface Person {
  firstName: string;
  lastName: string; 
}
function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
greeter({ firstName: "Jane", lastName: "User" });

# 类型基础
* 布尔值 boolean 
* 数字 number
* 字符串 string
* 对象 object
* 数组 number[] || Array<number>  都是表示数组里面值为数字
* 元组 Tuple 可以定义数组顺序项的类型 [string, number] 
(arr[0] is string, arr[1] is number) 当访问arr[3] 则会判断是否是string｜number

* 枚举 这是一个功能索引的方法
enum Color {Red = 1,Green,Blue}
let c: Color = Color.Green
let colorName: string = Color[2];
console.log(colorName); // Green

* Any let notSure: any = 4; 任意类型
* Void 表示没有任何类型。一般用来定义一个函数没有任何返回值
* Null 和 Undefined
* Never never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}
function infiniteLoop(): never {
    while (true) {
    }
}

# 命名空间
namespace Shapes {
  export namespace Polygons {
        export class Triangle { }
        export class Square { }
  }
}
import otherName =  Shapes.Polygons
let sq = new polygons.Square(); // Same as "new Shapes.Polygons.Square()"

