import axios from './axios'
export const allTasksRequest =()=>axios.get(`http://localhost:3000/api/tasks`)