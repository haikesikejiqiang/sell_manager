import req from '../utils/request'

export function getShopInfo() {
  return req.get('/shop/info')
}

export function editShop(params) {
  return req.post('/shop/edit', params)
}
