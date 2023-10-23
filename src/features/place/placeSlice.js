import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const placeSlice = createSlice({
    name: 'place', // Nombre del slice
    initialState: [], // El estado inicial es una matriz vacía
    reducers: {
      setItems: (state, action) => {
        return action.payload; // Asigna la matriz proporcionada en action.payload al estado
      },
      // Agrega más reducers según sea necesario para manipular la matriz
    },
  });
  

// export const placeSlice = createSlice({
//     name: 'place',
//     initialState,
//     reducers: {
//         setPlace : (state, action) => {
//             const { place_id, name, image } = action.payload
//             state.place_id = place_id
//             state.name = name
//             state.image = image            
//         }
//     }
// })

export const { setPlace } = placeSlice.actions;

export const selectPlace = (state) => state.place; // Selector para acceder a la matriz
export default placeSlice.reducer;

// export const { setPlace } = placeSlice.actions;
// export default placeSlice.reducer

export const logoutPlace = () => (dispatch) => {
    dispatch(setPlace(initialState));
  };