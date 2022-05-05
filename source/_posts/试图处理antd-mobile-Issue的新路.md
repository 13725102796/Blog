---
title: 试图处理antd-mobile Issue的心路历程
date: 2022-05-05 11:00:18
tags: Issue
categories: 
- Issue
---

# 问题：antd-mobile Swiper 在滑动切换的时候，触发点击事件，会导致Swiper卡住

# 开始调研相关swiper插件，发现都有这样的问题，如vant等

# 只能进入源码层研究
* fork ant-design-mobile 关联到自己仓库
* git clone ant-design-mobile 下载到本地运行
* yarn install && yarn start 安装依赖并本地运行调试
* 切换到 `./src/components/swiper/swiper.tsx`

# 开始分析 swiper 构成
* 主要依赖两个库 @react-spring/web && @use-gesture/react
`@react-spring/web` 主要是对动画的优化
`@use-gesture/react` 是对手势的操作处理
很明显该bug产生的原因是因为滑动即拖拽手势，而产生的

* 分析`@use-gesture/react`
``` bash 
import { useDrag } from '@use-gesture/react'

...

const bind = useDrag(
  state => {
    const slidePixels = getSlidePixels()
    if (!slidePixels) return
    const paramIndex = isVertical ? 1 : 0
    const offset = state.offset[paramIndex]
    const direction = state.direction[paramIndex]
    const velocity = state.velocity[paramIndex]
    setDragging(true)
    if (!state.last) {
      api.start({
        position: (offset * 100) / slidePixels,
        immediate: true,
      })
    } else {
      const minIndex = Math.floor(offset / slidePixels)
      const maxIndex = minIndex + 1
      const index = Math.round(
        (offset + velocity * 2000 * direction) / slidePixels
      )
      swipeTo(bound(index, minIndex, maxIndex))
      window.setTimeout(() => {
        setDragging(false)
      })
    }
  },
  {
    transform: ([x, y]) => [-x, -y],
    from: () => {
      const slidePixels = getSlidePixels()
      return [
        (position.get() / 100) * slidePixels,
        (position.get() / 100) * slidePixels,
      ]
    },
    bounds: () => {
      if (loop) return {}
      const slidePixels = getSlidePixels()
      const lowerBound = boundIndex(0) * slidePixels
      const upperBound = boundIndex(count - 1) * slidePixels
      return isVertical
        ? {
            top: lowerBound,
            bottom: upperBound,
          }
        : {
            left: lowerBound,
            right: upperBound,
          }
    },
    rubberband: props.rubberband,
    axis: isVertical ? 'y' : 'x',
    preventScroll: true,
    pointer: {
      touch: true,
    },
  }
)
```

* 发现将 preventScroll 设置为 false 则bug消失了。
产生新的问题： 在拖拽的时候会存在纵向滚动的问题

  
* 查看 use-gesture 文档，发现 该属性是个实验性的属性，建议使用 axis 配合 touchAction 达到同等效果。修改源码：
``` bash 
const touchMero: object = useMemo(()=>{
  console.log(dragging)
  return dragging ? {touchAction: 'pan-x'} : {}
},[dragging])

...
<animated.div
  className='adm-swiper-track-inner'
  style={{
    [isVertical ? 'y' : 'x']: position.to(
      position => `${-position}%`
    )
    
  }}
>
  {React.Children.map(validChildren, child => {
    return <div className='adm-swiper-slide' style={touchMero}>{child}</div>
  })}
</animated.div>
```
在微信环境，功能一切正常了。
在Safair环境，依旧存在纵向滚动的问题

* 查看 use-gesture github
发现该属性确实在Safair存在bug，[Issue](https://github.com/pmndrs/use-gesture/issues/486#issue-1212399919)

* 最后只能不了了之，等待第三方插件的维护人员修复这个bug

# 总结
该bug是由antd-mobile依赖的第三方插件引起的。所以一时半会也处理不了。
终于明白为什么antd-pro要自己封装完整的工具链，继承到umi，dva里面。
如果什么都要等他们修复，不知道要等到什么时候。
最终的结果可能是，该框架存在很多无法解决的bug，大多来源于第三方插件。



