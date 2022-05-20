---
title: React自定义Hook
date: 2022-05-19 13:04:03
tags: Hook
categories: 
- React
---

# 为何要自定义Hook
抽离公共逻辑hook，复用代码，而且数据隔离

# 案例
想要一个公共获取详情的Hook
``` bash 
function useGetDetail(id,url,params={}){
  const [detail, setDetail] = useState(null);
  useEffect(async ()=>{
    const data = await axios.get(url+id,params)
    setDetail(data.result);
  },[])
  return detail
}

# 这样就可以通过 useGetDetail(id,url,params)去获取对应的详情
const detail1 = useGetDetail('1','xxxx/api/detail?id=',{})
const detail2 = useGetDetail('2','xxxx/api/detail?id=',{})

#注意，自定义Hook必须以use开头，不然eslint检测不到这是一个自定义Hook

```




