import http from '@/api/http'

class Services {
  //定义一些请求数据的方法
  async getLike(token) {
   return await http.post('POST//like',{token: token})
  }
  async getKtvStore (token) {
    return await http.post('POST//ktv', {token,token})
  }

}

export default new Services()