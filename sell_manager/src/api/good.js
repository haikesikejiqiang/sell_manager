import req from '../utils/request'

export function goodList(params) {
  return req.get('/goods/list', params)
}
export function catelist(params) {
  return req.get('/goods/catelist', params)
}
export function addcate(params) {
  return req.post('/goods/addcate', params)
}
export function delcate(params) {
  return req.get('/goods/delcate', params)
}
export function editcate(params) {
  return req.post('/goods/editcate', params)
}
export function getGories() {
  return req.get('/goods/categories')
}
export function addGood(params) {
  return req.post('/goods/add', params)
}
export function delGood(params) {
  return req.get('/goods/del', params)
}
export function check(params) {
  return req.get('/goods/id', params)
}
export function editShop(params) {
  return req.post('/goods/edit', params)
}
