import axios from './axios'

//export const loginRequest = user => axios.post(`/login`, user)

export const placeServiceByUserIdRequest = (user_id, place_id) => axios.get(`/PlaceServiceByUserId/${user_id}/${place_id}`)