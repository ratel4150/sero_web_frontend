import axios from 'axios'
import { getUrl } from '../api/rest'

const BASE_URL = getUrl()
let token = null;

const setToken = (tokenUser) => {
    token = `Bearer ${tokenUser}`
}

const getEncuestasByIdCampana = async (id_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/encuestas/${id_campana}`, {headers})
    return request.then(response => response.data)
}



const encuestaService = {
    setToken,
    getEncuestasByIdCampana,
}

export default encuestaService