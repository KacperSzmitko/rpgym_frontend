import axios from 'axios'
import { BASE_API_URL } from '../../common/constans'

export const login = (email: string, password: string) => async () => {
  const data = { email, password }
  const response = await axios
    .post(BASE_API_URL + 'auth/token/', data)
    .catch((err) => err.response)
  return response
}

export const register = (email: string, password: string) => async () => {
  const data = { email, password }
  const response = await axios
    .post(BASE_API_URL + 'users/', data)
    .catch((err) => err.response)
  return response
}

export const refresh_cookie_token = async () => {
  const response = await axios
    .get(BASE_API_URL + 'auth/token/refresh_cookie/')
    .catch((err) => err.response)
  return response
}

export const logout = async () => {
  const response = await axios
    .post(BASE_API_URL + 'auth/logout/')
    .catch((err) => err.response)
  return response
}
