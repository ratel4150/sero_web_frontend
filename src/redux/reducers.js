import { combineReducers } from 'redux';
import userReducer from '../features/user/userSlice'; // Importa el reducer de usuario
import placeReducer from '../features/place/placeSlice';
import plazaMapaReducer from './plazaMapa.Slice'; // Importa el reducer de campana y mapa
import featuresReducer from './featuresSlice'; // Importa el reducer de características
import dialogReducer from './dialogSlice'; // Importa el reducer de diálogo
import mapaReducer from './mapaSlice'; // Importa el reducer de mapa



const rootReducer = combineReducers({
  user: userReducer,
  place: placeReducer,
  plaza_mapa: plazaMapaReducer,
  features: featuresReducer,
  dialog: dialogReducer,
  mapa: mapaReducer,
  //service: serviceReducer,
  //process: processReducer,
  // Agrega más reducers individuales aquí si es necesario
});

export default rootReducer;