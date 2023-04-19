---
title: Vue2 与 Vue3 监听方式的优化
date: 2023-04-19 13:47:25
tags: Vue DefineProperty Proxy
---

# DefineProperty 
``` bash 
var data = {
  key: {
    a: 1,
    b: 2,
    c: {
      c1: 5
    }
  }
};
function isObject(a) {
  return typeof a === 'object'
}
function reduce(obj) {

  for (var i in obj) {
    let val = obj[i]
    if (isObject(val)) {
      reduce(val)
    }

    Object.defineProperty(obj, i, {
      get() {
        console.log('属性' + i + '被get了一下')
        return val
      },
      set(value) {
        console.log('属性' + i + '被set成了' + value)
        val = value
      }
    })

  }
}

reduce(data)
console.log(data.key.a)
```

# Proxy 
``` bash 
var data = {
  key: {
    a: 1,
    b: 2,
    c: {
      c1: 5
    }
  }
};
const handler = {
  get: function (obj, prop) {
    console.log('属性' + prop + '被get了一下')
    return prop in obj ? obj[prop] : null;
  },
  set: function (obj, prop, value) {
    console.log('属性' + prop + '被set成了' + value)
    obj[prop] = value
    return true
  }
};

data = new Proxy(data, handler)

console.log(data.key.a)



```

