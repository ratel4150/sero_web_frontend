import { useSelector, useDispatch } from 'react-redux';
import { setAccountData } from '../redux/accountDataSlice';
import { setActions } from '../redux/actionsSlice';
import { setAlertInfoFromRequest } from '../redux/alertInfoSlice';
import { setContributorAddress } from '../redux/contributorAddressSlice';
import { setDebts } from '../redux/debtsSlice'; // Agregado
import { setImageData } from '../redux/getImageDataSlice'; // Agregado
import { setRowAccount } from '../redux/getRowAccountSlice'; // Agregado
import { setInformationContributorPersonalData } from '../redux/informationContributorPersonalDataSlice'; // Agregado
import { setPhotos } from '../redux/photosSlice'; // Agregado
import { setPlazaNumber } from '../redux/plazaNumberSlice'; // Agregado

// Hook personalizado para acceder a múltiples slices
const useCombinedSlices = () => {
  // Acceder al estado de los slices
  const accountData = useSelector((state) => state.accountData);
  const actions = useSelector((state) => state.actions);
  const alertInfo = useSelector((state) => state.alertInfo);
  const contributorAddress = useSelector((state) => state.contributorAddress);
  const debts = useSelector((state) => state.debts); // Agregado
  const getImageData = useSelector((state) => state.getImageData); // Agregado
  const getRowAccount = useSelector((state) => state.getRowAccount); // Agregado
  const informationContributorPersonalData = useSelector((state) => state.informationContributorPersonalData); // Agregado
  const photos = useSelector((state) => state.photos); // Agregado
  const plazaNumber = useSelector((state) => state.plazaNumber); // Agregado

  const dispatch = useDispatch();

  // Acciones personalizadas para los slices
  const setAccountDataAction = (data) => {
    dispatch(setAccountData(data));
  };

  const setActionsAction = (data) => {
    dispatch(setActions(data));
  };

  const setAlertInfoAction = (data) => {
    dispatch(setAlertInfoFromRequest(data));
  };

  const setContributorAddressAction = (data) => {
    dispatch(setContributorAddress(data));
  };

  const setDebtsAction = (data) => { // Agregado
    dispatch(setDebts(data));
  };

  const setGetImageDataAction = (data) => { // Agregado
    dispatch(setImageData(data));
  };

  const setRowAccountAction = (data) => { // Agregado
    dispatch(setRowAccount(data));
  };

  const setInformationContributorPersonalDataAction = (data) => { // Agregado
    dispatch(setInformationContributorPersonalData(data));
  };

  const setPhotosAction = (data) => { // Agregado
    dispatch(setPhotos(data));
  };

  const setPlazaNumberAction = (data) => { // Agregado
    dispatch(setPlazaNumber(data));
  };

  // Puedes agregar más acciones según tus necesidades

  return {
    accountData,//
    actions,//
    alertInfo,//
    contributorAddress,//
    debts, // Agregado
    getImageData, // Agregado
    getRowAccount, // Agregado
    informationContributorPersonalData, // Agregado
    photos, // Agregado
    plazaNumber, // Agregado
    setAccountData: setAccountDataAction,
    setActions: setActionsAction,
    setAlertInfo: setAlertInfoAction,
    setContributorAddress: setContributorAddressAction,
    setDebts: setDebtsAction, // Agregado
    setGetImageData: setGetImageDataAction, // Agregado
    setRowAccount: setRowAccountAction, // Agregado
    setInformationContributorPersonalData: setInformationContributorPersonalDataAction, // Agregado
    setPhotos: setPhotosAction, // Agregado
    setPlazaNumber: setPlazaNumberAction, // Agregado
    // Agrega más funciones de acción si es necesario
  };
};

export default useCombinedSlices;
