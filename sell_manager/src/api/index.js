import req from '../utils/request'

export function getTotal() {
  return req.get('/order/totaldata')
}
