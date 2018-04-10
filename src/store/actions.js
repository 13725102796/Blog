import Services from './services'
import api from '@/api/index'

// 定义一个懒函数，对commit进行过滤处理
const lazyCommit = (commitObj, commitData, commit) => {
  if(commit.length === 0) return 
  commit(commitObj,commitData)
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
    const res = await api.getKtvStore('23','113')
    // state.ktvStore = res.data
    commit("SET_KTVSTORE",res.data)
    // console.log(res)
  },
  async getLike({state,commit}) {
    const res = await Services.getLike('yechang')
    lazyCommit("SET_LIKE", res.data.data, commit)
    // commit("SET_LIKE", res.data.data)
  }
}