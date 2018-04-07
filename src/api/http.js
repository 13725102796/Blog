import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

// axios 配置
const BASE_URL = 'http://dev-home.365mdb.com/'
const URL = process.env.NODE_ENV === 'production' ? '/' : BASE_URL

//发送一般请求
const http = axios.create({
  timeout: 5000,
  baseURL: URL,
  header: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
const formConfig = {
  timeout: 60000,
  baseURL: URL,
  headers: {
    'Content-Type' : 'multipart/form-data'
  }
}

http.interceptors.request.use(config => {
  // Do something before request is sent
  return config
}, err => {
  return Promise.reject(error);
})

const vm = new Vue()

function result () {

}

export default {
  async get( url ,params = {}){
    return new Promise ((resolve, reject) => {
      try {
        const data = await http.get(url,{params})
        const code = Number(data.data.errorCode)
        if (code === 0) resolve (data.data)
        else {
          // 提示报错信息
        }
      }
      catch(err) {
        console.log(err)
      }
    }) 
  }, 
  async post(url, params = {} ) {
    return new Promise((resolve, reject) => {
      try {
        const data = await http.post(url, qs.stringify(params))
        const code = Number(data.data.errorCode)
        if(code === 0) {
          resolve(data.data)
        } else if (code > 0) {
          //报错 data.data.errorMessage
        } else if (code < 0 ) {
          // 重新登陆 清除登陆信息 location.reload()
          window.location.reload()
        } else {
          resolve(data)
        }
      }
      catch (err) {
        console.log(err)
      }
      
    })
  },

  async form(url, params={}) {
    return Promise((reslove, reject) => {
      try{
        const data = http.post(url,params,formConfig)
        const code = Number(data.data.errorCode)
        if(code === 0) {
          resolve(data.data)
        } else if (code > 0) {
          //报错 data.data.errorMessage
        } else if (code < 0 ) {
          // 重新登陆 清除登陆信息 location.reload()
          window.location.reload()
        } else {
          resolve(data)
        }
      }
      catch (err) {
        console.log(err)
      }
    })
    
  }


}