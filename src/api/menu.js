import axios from './axios'

//export const loginRequest = user => axios.post(`/login`, user)

export const menusUserIdRequest = (user_id) => axios.get(`/MenusUserId/${user_id}`)