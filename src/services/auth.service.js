import axios from 'axios'
import { getUrl } from '../api/rest'

let token = null;
const BASE_URL = getUrl()

export const setToken = (tokenUser) => {
    token = `Bearer ${tokenUser}`
}

export const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await axios.post(`${BASE_URL}/auth/login`, {
                username: username,
                password: password
            })
            //console.log(user);
            resolve(user.data)
        } catch (error) {
            reject(error)
        }
    })
}

export const getUsers = () => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/auth/users`, { headers })
    return request.then(response => {
        return response.data
    })
}