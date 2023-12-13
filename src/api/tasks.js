import axios from "./axios";
export const allTasksRequest = () =>
  axios.get(`http://localhost:3000/api/tasks`);
export const createTask = async (task) => {
  console.log(task);
  // Agrega tu lógica para verificar si task está completo
  if (task.nombre && task.activo && task.id_proceso) {
    try {
      const response = await axios.post("http://localhost:3000/api/task", task);
      console.log(response);
      // Puedes realizar acciones adicionales después de la solicitud Axios si es necesario
      return response.data; // O cualquier otro dato relevante de la respuesta
    } catch (error) {
      console.error("Error al crear la tarea:", error);
      throw error; // Puedes propagar el error o manejarlo de otra manera según tus necesidades
    }
  } else {
    console.warn("La tarea no está completa. No se realizará la solicitud.");
    return null; // O cualquier otro valor que indique que la solicitud no se realizó
  }
};
export const validateTask = async (taskname) => {
  console.log(taskname);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/task/check-name",
      { name: taskname }
    );
    return response.data.exists;
  } catch (error) {
    console.error("Error al validar si la tarea existe:", error);
    throw error;
  }
};

export const updateTasks = async (task) => {

  
  try { 
    const { activo, id_proceso, nombre,id_tarea } = task;
    console.log(activo,id_proceso,nombre);

    // Use the await keyword to wait for the HTTP request to complete
    const response = await axios.put(`http://localhost:3000/api/tasks/${id_tarea}`, {
      name: nombre,
      process_id: id_proceso,
      active: activo,
    });

    // Log the response for debugging purposes
    console.log('Update Task Response:', response.data);

    // Optionally, you can return the updated data or some indication of success
    return response.data;
  } catch (error) {
    // Log and handle errors
    console.error('Error updating task:', error.message);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};
