import { useSelector, useDispatch } from 'react-redux';
import { setAccountData } from '../redux/accountDataSlice';
import { setActions } from '../redux/actionsSlice';
import { setAlertInfoFromRequest } from '../redux/alertInfoSlice';
import { setContributorAddress } from '../redux/contributorAddressSlice';
import { setDebts } from '../redux/debtsSlice'; // Agregado
import { setImageData } from '../redux/getImageDataSlice'; // Agregado
import { setRowAccount } from '../redux/getRowAccountSlice'; // Agregado
import { setInformationContributor } from '../redux/informationContributorSlice'; // Agregado
import { setPhotos } from '../redux/photosSlice'; // Agregado
import { setPlazaNumber } from '../redux/plazaNumberSlice'; // Agregado
import { setPayments } from '../redux/paymentsSlice';

// Hook personalizado para acceder a múltiples slices
const useCombinedSlices = () => {
  // Acceder al estado de los slices
  const accountData = useSelector((state) => state.account);
  const payments = useSelector((state)=>state.payment)
  const actions = useSelector((state) => state.actions);
  const photos = useSelector((state) => state.photo);
  const alertInfo = useSelector((state) => state.alertInfo)
  /* 
  ;
  const contributorAddress = useSelector((state) => state.contributorAddress);
  const debts = useSelector((state) => state.debts); // Agregado
   // Agregado
  const getRowAccount = useSelector((state) => state.getRowAccount); // Agregado */
  const informationContributor = useSelector((state) => state.informationContributor); // Agregado
  const plazaNumber = useSelector((state) => state.plazaNumber);
  const getImageData = useSelector((state) => state.getImageData);
 /*   // Agregado
  const plazaNumber = useSelector((state) => state.plazaNumber); // Agregado */
  const debts = useSelector((state) => state.debts);
  const dispatch = useDispatch();

  // Acciones personalizadas para los slices
  const setAccountDataAction = (data) => {
    dispatch(setAccountData(data));
  };


  const setInformationContributorAction = (data) => { // Agregado
    dispatch(setInformationContributor(data));
  };

  const setDebtsAction = (data) => { // Agregado
    dispatch(setDebts(data));
  };

  const setPaymentsAction = (data) => { // Agregado
    dispatch(setPayments(data));
  };

  const setActionsAction = (data) => {
    dispatch(setActions(data));
  };

  const setPhotosAction = (data) => { // Agregado
    dispatch(setPhotos(data));
  };


  const setAlertInfoAction = (data) => {
    dispatch(setAlertInfoFromRequest(data));
  };

  const setPlazaNumberAction = (data) => { // Agregado
    dispatch(setPlazaNumber(data));
  };

  const setGetImageDataAction = (data) => { // Agregado
    dispatch(setImageData(data));
  };

 /*  

  

  const setContributorAddressAction = (data) => {
    dispatch(setContributorAddress(data));
  };

  

  

  const setRowAccountAction = (data) => { // Agregado
    dispatch(setRowAccount(data));
  };

  const setInformationContributorAction = (data) => { // Agregado
    dispatch(setInformationContributor(data));
  };

 

   */

  // Puedes agregar más acciones según tus necesidades

  return {
    accountData,//
    informationContributor,
    debts,
    payments,
    actions,
    photos,
    alertInfo,
    plazaNumber,
    getImageData,
   /*  //
    //
    contributorAddress,//
    debts, // Agregado
    // Agregado
    getRowAccount, // Agregado
    informationContributor, // Agregado
     // Agregado
    // Agregado */
    setAccountData: setAccountDataAction,
    setInformationContributor: setInformationContributorAction,
    setDebts: setDebtsAction,
    setPayments:setPaymentsAction,
    setActions: setActionsAction,
    setPhotos: setPhotosAction,
    setAlertInfo: setAlertInfoAction,
    setPlazaNumber: setPlazaNumberAction,
    setGetImageData: setGetImageDataAction,
    /* 
    
    setContributorAddress: setContributorAddressAction,
    setDebts: setDebtsAction, // Agregado
     // Agregado
    setRowAccount: setRowAccountAction, // Agregado
    setInformationContributor: setInformationContributorAction, // Agregado
     // Agregado
     */ // Agregado
    // Agrega más funciones de acción si es necesario
  };
};

export default useCombinedSlices;
