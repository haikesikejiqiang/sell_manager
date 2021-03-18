import req from '../utils/request'

export function add(params) {
  return req.post('/users/add', params)
}

export function getList(params) {
  return req.get('/users/list', params)
}

export function delList(params) {
  return req.get('/users/del', params)
}

export function editList(params) {
  return req.post('/users/edit', params)
}
export function batchdel(params) {
  return req.get('/users/batchdel', params)
}
export function checkoldpwd(params) {
  return req.get('/users/checkoldpwd', params)
}
export function editpwd(params) {
  return req.post('/users/editpwd', params)
}
export function info() {
  return req.get('/users/info')
}

export function avataredit(params) {
  return req.get('/users/avataredit', params)
}
