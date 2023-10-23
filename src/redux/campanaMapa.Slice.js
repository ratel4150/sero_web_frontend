import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id_campana: 0,
    nombre_campana: '',
    latitud: 0,
    longitud: 0
}


export const campanaMapaSlice = createSlice({
    name: 'campana_mapa',
    initialState,
    reducers: {
        setCampanaMapa: (state, action) => {
            const { id_campana, nombre, latitud, longitud } = action.payload
            state.id_campana = id_campana
            state.nombre_campana = nombre
            state.latitud = latitud
            state.longitud = longitud
        }
    }
})


export const { setCampanaMapa } = campanaMapaSlice.actions;
export default campanaMapaSlice.reducer
