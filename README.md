# 功能
实现序列化json时包含函数，支持普通函数、箭头函数、函数简写

# 只有两个函数,都只有一个参数

1. stringify() 将对象转字符串

2. parse() 将字符串转对象
 
会尝试将带有`function`，`=>`，`key:key(`字符的解析为函数
 

```js
import jsonfunc from "@adtkcn/jsonfunc";

var str = jsonfunc.stringify({
    a: 1,
    b() {
        console.log('b');
    },
    c(a, b) {
        console.log('c', a, b);
    },
    d: function () {
        console.log('d');
    },
    e: function (c, d) {
        console.log(c, d);
    },
    f: () => {
        console.log('f');
    },
    g: (a, b, c) => {
        console.log('g', a, b, c);
    },
    h: (a, b, c) => console.log('h', a, b, c)
})

var obj = jsonfunc.parse(str)
console.log(obj);
obj.b();
obj.c(1, 2);
obj.d();
obj.e(1, 2);
obj.f();
obj.g(1, 2, 3);
obj.h(1, 2, 3);
```