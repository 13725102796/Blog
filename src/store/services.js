import http from '@/api/http'

class Services {
  //定义一些请求数据的方法
  async getLike(token) {
   return await http.post('POST//like',{token: token})
  }

}

export default new Services()