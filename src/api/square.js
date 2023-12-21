import axios from "./axios";

export const getAllSquares = () =>
  axios.get(`http://localhost:3000/api/plazas`);