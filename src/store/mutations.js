export default {
  // 定义一些突变的方法 如果不通过 commit('SET_ADDRESS', address) 会报错 
  // SET_ADDRESS: (state, address) => {
  //   state.address = address
  // },
  SET_KTVSTORE: (state, data) => {
    state.ktvStore = data
  },
  SET_LIKE: (state, data) => {
    // console.log(state.like)
    state.like = state.like.concat(data)
    // state.like= [...data]
    console.log(state.like) 
  }
}