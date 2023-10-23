import axios from 'axios'
import { getUrl } from '../api/rest'

const BASE_URL = getUrl() + '/dashboard'
let token = null;

const setToken = (tokenUser) => {
    token = `Bearer ${tokenUser}`
}

const getTotalRegistros = async (db_name, table_name, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/total-registros/${db_name}/${table_name}/${id_servicio_campana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getEncuestasHechas = async (db_name, table_name_data, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/encuestas-hechas/${db_name}/${table_name_data}/${id_servicio_campana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getEncuestasContestadasTotales = async (id_encuesta) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/encuestas-contestadas-totales/${id_encuesta}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getEncuestasContestadasParciales = async (id_encuesta) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/encuestas-contestadas-parciales/${id_encuesta}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getPeriodoGeneral = async (db_name, table_name_data, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/periodo-general/${db_name}/${table_name_data}/${id_servicio_campana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getDiasTrabajados = async (db_name, table_name_data, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/dias-trabajados/${db_name}/${table_name_data}/${id_servicio_campana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getEncuestasRealizadasLineSemana = async (db_name, table_name_data, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/encuestas-realizadas-line-semana/${db_name}/${table_name_data}/${id_servicio_campana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getMeta = async (id_encuesta) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/meta/${id_encuesta}`, { headers })
    return request.then(response => response.data)
}

const getPreguntasEncuesta = async (id_encuesta) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/preguntas-encuesta/${id_encuesta}`, { headers })
    return request.then(response => response.data)
}

const getDataPreguntaEncuesta = async (db_name, table_name_data, cat_table_name, field_table, cat_field_name, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/data-pregunta-encuesta/${db_name}/${table_name_data}/${cat_table_name}/${field_table}/${cat_field_name}/${id_servicio_campana}`, { headers })
    return request.then(response => response.data)
}

const getSemanasRegistros = async (db_name, table_name_data, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/semanas-registros/${db_name}/${table_name_data}/${id_servicio_campana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getTotalSemanasRegistros = async (db_name, table_name_data, cat_table_name, field_table, cat_field_name, id_servicio_campana, semana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/total-semanas-registros/${db_name}/${table_name_data}/${cat_table_name}/${field_table}/${cat_field_name}/${id_servicio_campana}/${semana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getTotalFechasRegistros = async (db_name, table_name_data, cat_table_name, field_table, cat_field_name, id_servicio_campana, fecha_inicial, fecha_final) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/total-fechas-registros/${db_name}/${table_name_data}/${cat_table_name}/${field_table}/${cat_field_name}/${id_servicio_campana}/${fecha_inicial}/${fecha_final}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getTotalSemanasRegistrosLine = async (db_name, table_name_data, cat_table_name, field_table, cat_field_name, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/total-semanas-registros-line/${db_name}/${table_name_data}/${cat_table_name}/${field_table}/${cat_field_name}/${id_servicio_campana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getDataGeneral = async (db_name, table_name_data, id_servicio_campana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/data-general/${db_name}/${table_name_data}/${id_servicio_campana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getPeriodoSemana = async (semana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/periodo-filtro-semana/${semana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getNumeroEncuestasFiltro = async (tipo, db_name, table_name_data, fecha_min, fecha_max, id_servicio_campana, semana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/numero-encuestas-filtro/${tipo}/${db_name}/${table_name_data}/${fecha_min}/${fecha_max}/${id_servicio_campana}/${semana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getNumeroEncuestasContestadasFiltro = async (tipo, db_name, table_name_data, cat_table_name, field_table, cat_field_name, fecha_min, fecha_max, id_servicio_campana, semana) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/numero-encuestas-contestadas-filtro/${tipo}/${db_name}/${table_name_data}/${cat_table_name}/${field_table}/${cat_field_name}/${fecha_min}/${fecha_max}/${id_servicio_campana}/${semana}`, { headers })
    return request.then(response => {
        return response.data
    })
}

const getDiasTrabajadosFiltro = async (tipo, semana, fecha_inicial, fecha_final) => {
    let headers = {
        Authorization: token
    }
    const request = axios.get(`${BASE_URL}/dias-trabajados-filtro/${tipo}/${semana}/${fecha_inicial}/${fecha_final}`, { headers })
    return request.then(response => {
        return response.data
    })
}


const dashboardService = {
    setToken,
    getTotalRegistros,
    getEncuestasHechas,
    getEncuestasContestadasTotales,
    getEncuestasContestadasParciales,
    getPeriodoGeneral,
    getDiasTrabajados,
    getEncuestasRealizadasLineSemana,
    getMeta,
    getPreguntasEncuesta,
    getDataPreguntaEncuesta,
    getSemanasRegistros,
    getTotalSemanasRegistros,
    getTotalFechasRegistros,
    getTotalSemanasRegistrosLine,
    getDataGeneral,
    getPeriodoSemana,
    getNumeroEncuestasFiltro,
    getNumeroEncuestasContestadasFiltro,
    getDiasTrabajadosFiltro
}

export default dashboardService




