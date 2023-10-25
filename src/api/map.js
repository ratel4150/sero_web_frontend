import axios from './axios'

export const serviceMapByIdPlaza = (place_id) => axios.get(`/ServiceMapByIdPlaza/${place_id}`)
export const layerMapByIdPlaza = (place_id) => axios.get(`/LayersMapByIdPlaza/${place_id}`)