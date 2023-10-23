import axios from './axios'

//export const loginRequest = user => axios.post(`/login`, user)

export const placeServiceProcessByUserIdRequest = (user_id) => axios.get(`/PlaceServiceProcessByUserId/${user_id}`)