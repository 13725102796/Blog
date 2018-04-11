import http from './http'

class API {
  //定义一些获取数据的接口，
  // getCityList = params => {
  //   return http.post('api_home_admin/get_city_list', params)
  // }
  getKtvStore = (token) => {
    return http.post('ktv/getStore',token)
  }
}

export default new API()