import {workAssignmentRequest} from '../api/assignment.js'

export const postWorkAssignment = async (place_id, service_id, excelData) => {
    try {

      console.log('este es el excelData en el service', excelData)
      const response = await workAssignmentRequest(place_id, service_id, excelData);
      return response.data; // Puedes ajustar esto según la estructura de respuesta de tu API
    } catch (error) {
      console.error('Error al enviar datos a la API', error);
      throw error; // O maneja el error según tus necesidades
    }
  };