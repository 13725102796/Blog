---
title: useCallback 和 useMemo 的区别
date: 2022-04-25 20:52:17
tags: React 
---

# useCallback

const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新。当你把回调函数传递给经过优化的并使用引用相等性去避免非必要渲染（例如 shouldComponentUpdate）的子组件时，它将非常有用。


# useMemo 
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
返回一个 memoized 值 。

把“创建”函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才重新计算 memoized 值。这种优化有助于避免在每次渲染时都进行高开销的计算。

你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证
将来，React 可能会选择“遗忘”以前的一些 memoized 值，并在下次渲染时重新计算它们，比如为离屏组件释放内存。先编写在没有 useMemo 的情况下也可以执行的代码 —— 之后再在你的代码中添加 useMemo，以达到优化性能的目的。

function Example() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
 
    const getNum = useMemo(() => {
        return Array.from({length: count * 100}, (v, i) => i).reduce((a, b) => a+b)
    }, [count])
 
    return <div>
        <h4>总和：{getNum()}</h4>
        <div>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}

避免因为val变化而导致getNum重新渲染

# 总结
useCallback 返回的是一个函数
useMemo 返回的的函数的执行结果

类似于计算属性computed，避免使用了该函数或者该值的组件重复渲染。

``` bash
# 把事件写进render里面会在重新渲染的时候重新生成新的onclick
class Demo extends Component{
    render() {
        return 
        <div>
            <Button onClick={ () => { console.log('Hello World！！'); }}  />
        </div>;
    }
}
# 在组件中可以在constructor里面
class Demo extends Component{
    constructor(){
        super();
        this.buttonClick = this.buttonClick.bind(this);
    }
    render() {
        return 
        <div>
            <Button onClick={ this.buttonClick }  />
        </div>;
    }
}
# 在函数式组件中开发
function Demo(){
    const buttonClick = useCallback(() => { 
    	console.log('Hello World！！')
    },[])
    return(
        <div>
            <Button onClick={ buttonClick }  />
        </div>
    )
}

```
