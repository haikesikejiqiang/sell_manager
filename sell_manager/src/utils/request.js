import axios from 'axios'
import qs from 'qs'
import local from '../utils/local'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

axios.defaults.baseURL = 'http://localhost:5000'
axios.defaults.timeout = 5000

// 添加请求拦截器
axios.interceptors.request.use(config => {
  NProgress.start()
  const token = local.get('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  NProgress.done()
  return response.data
})

export default {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(data => {
          resolve(data)
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  },
  post(url, query) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(query))
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  }
}
