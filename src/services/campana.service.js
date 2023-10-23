import axios from 'axios'
import { getUrl } from '../api/rest'


const BASE_URL = getUrl()
let token = null;

const setToken = (tokenUser) => {
    token = `Bearer ${tokenUser}`
}

const getCampanaByIdUser = async (id_user) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/campanas/campana_by_id_user/${id_user}`, {headers})
    return request.then(response => response.data)
}

const getDataCampanaById = async (id_campana) => {
    let headers = {
        Authorization: token
    }
    const request = await axios.get(`${BASE_URL}/campanas/data_campana/${id_campana}`, {headers})
    return request.data
}




const campanaService = {
    setToken,
    getCampanaByIdUser,
    getDataCampanaById
}

export default campanaService