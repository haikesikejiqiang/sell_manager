import req from '../utils/request'

export function login(params) {
  return req.post('/users/checkLogin', params)
}
