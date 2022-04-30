---
title: react基于content实现全局变量的方法
date: 2020-05-16 22:41:24
tags: react
---
# 先生成一个context.js
``` bash 
import React from 'react'
export const fontSize = {
  small: '12px',
  big: '36px'
}
export const ThemeContext = React.createContext({
  fontSize: fontSize.small,
})
```

# 创建一个组件 App.js,并导入context
``` bash 
import React from 'react'
import { ThemeContext,fontSize} from './context';

# 定义一个顶级组件,将context的变量同步到state，通过修改state去更新子组件的视图
# 
class App extends React.Component {
  constructor(props){
    super(props)
    // 该方法可以封装在fontSize对象里面，通过bind(this)挂载到state上面
    this.handleFontSize = () => {
      this.setState(state => ({
        fontSize: state.fontSize === fontSize.small
            ? fontSize.big
            : fontSize.small,
      }));
    }
    // State 也包含了更新函数，因此它会被传递进 context provider。
    this.state = {
      fontSize: fontSize.small,
      handleFontSize: this.handleFontSize,
    };
  }
  # 通过 ThemeContext.Provider 将该state往里面的组件传递
  render(){
    <div>
       <ThemeContext.Provider value={this.state}>
          <div>
            <ChangeFontSizeBtn />
          </div>
        </ThemeContext.Provider>
    </div>
  }
}

# 定义使用该全局变量的组件 ChangeFontSizeBtn
# 通过 <ThemeContext.Consumer> {(state)=>()}</ThemeContext.Consumer>组件获取该state
function ChangeFontSizeBtn(){
  return (
    <ThemeContext.Consumer>
      {({fontSize,handleFontSize})=>(
        <button
          onClick={handleFontSize}
          style={{fontSize: fontSize}}  
        >
          change
        </button>
      )}
    </ThemeContext.Consumer>
  )
}


```

最终完成某层子组件修改全局变量的方法

# 总结
* 定义一个context对象，通过React.creatContext({fontSize: '12px'})暴露出来
* 在全局组件中引入该context，用state去同步context对象的数据，并创建一个修改数据的方法
* 定义一个ThemeContext.Provider组件可以，并将state作为value的值传递进去 <ThemeContext.Provider value={this.state}></ThemeContext.Provider>
* 在某个需要修改该数据的组件中，通过ThemeContext.Consumer去获取state的数据 <ThemeContext.Consumer> {(state)=>()}</ThemeContext.Consumer>


