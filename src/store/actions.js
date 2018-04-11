import Services from './services'
import api from '@/api/index'

// 定义一个懒函数，对commit进行过滤处理
const lazyCommit = (commitObj, commitData, commit) => {
  console.log(commitData.length)
  if(commitData.length === 0) return false
  commit(commitObj,commitData)
}
// 判断环境 ，进行请求 
const nodeEnv = async (method,token) => {
  let res ;
  console.log(process.env.NODE_ENV)
  if(process.env.NODE_ENV === 'development') {
    res = Services[method]('yechang')
  } else {
    res = api[method](token)
  }
  return res
}
export default {
  //返回一些行为对象
  // async cityList({state,commit}, opt) {
  //   const res = await api.getCityList(opt)
  //   commit("SET_CITYLIST", res.data.city)
  //   commit("SET_HOTLIST", res.data.hot)
  //   console.log(res)
  // }
  async getKtvStore({state,commit}) {
    // const res = await api.getKtvStore('23','113')
    const res = await nodeEnv('getKtvStore',{lat:'23',lng:'113'})
    // console.log(res)
    return lazyCommit("SET_KTVSTORE", res.data.data, commit)
    // commit("SET_KTVSTORE",res.data.data)
    // console.log(res)
  },
  async getLike({state,commit}) {
    const res = await Services.getLike('yechang')
    return lazyCommit("SET_LIKE", res.data.data, commit)
    // commit("SET_LIKE", res.data.data)
  }
}