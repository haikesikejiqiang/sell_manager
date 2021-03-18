import req from '../utils/request'

export function getOrderList(params) {
  return req.get('/order/list', params)
}
export function getOrderSearch(params) {
  return req.get('/order/search', params)
}
