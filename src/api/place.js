import axios from './axios'

export const placeById = (place_id) => axios.get(`/PlaceById/${place_id}`)
export const placeByUserIdRequest = (user_id) => axios.get(`/PlaceByUserId/${user_id}`)