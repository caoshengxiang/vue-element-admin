import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function getTokenValue() {
  return Cookies.get('token_value')
}
export function setTokenValue(token) {
  return Cookies.set('token_value', token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
