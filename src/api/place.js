import axios from './axios'

//export const loginRequest = user => axios.post(`/login`, user)

export const placeByUserIdRequest = (user_id) => axios.get(`/PlaceByUserId/${user_id}`)