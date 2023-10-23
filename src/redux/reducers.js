import { combineReducers } from 'redux';
import userReducer from '../features/user/userSlice'; // Importa el reducer de usuario
import placeReducer from '../features/place/placeSlice';
//import campanaMapaReducer from './campanaMapaReducer'; // Importa el reducer de campana y mapa
//import mapaReducer from './mapaReducer'; // Importa el reducer de mapa
//import dialogReducer from './dialogReducer'; // Importa el reducer de diálogo
//import featuresReducer from './featuresReducer'; // Importa el reducer de características

const rootReducer = combineReducers({
  user: userReducer,
  place: placeReducer,
  //service: serviceReducer,
  //process: processReducer,
  //campana_mapa: campanaMapaReducer,
  //mapa: mapaReducer,
  //dialog: dialogReducer,
  //features: featuresReducer,
  // Agrega más reducers individuales aquí si es necesario
});

export default rootReducer;