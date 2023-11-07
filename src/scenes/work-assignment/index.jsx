import React, { useState, useEffect } from "react";

import { tokens } from "../../theme";
import { getPlacesByUserId } from '../../services/place.service';
import { getPlaceServiceByUserId } from '../../services/service.service';
import { postWorkAssignment } from "../../services/assignment.js";
import PlaceSelect from '../../components/PlaceSelect'
import ServiceSelect from '../../components/ServiceSelect'
import FileUploadExcel from "../../components/FileUploadExcel";
import AlertMessage from "../../components/AlertMessage";
import { useSelector } from 'react-redux'
import { read, utils } from 'xlsx';
// material ui
import { Input, InputAdornment, TextField, Box, useTheme, MenuItem, Button, Typography, FormGroup, FormControlLabel, Switch } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// iconos
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import LockResetIcon from '@mui/icons-material/LockReset';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';




const Index = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector(state => state.user)
    const [places, setPlaces] = useState([])
    const [services, setServices] = useState([])
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [excelData, setExcelData] = useState(null);
    const [fileValid, setFileValid] = useState(true);
    //const [fileValid, setFileValid] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {   

        async function loadPlaces() {
          const res = await getPlacesByUserId(user.user_id)
          setPlaces(res)      
        }
    
        loadPlaces()   
       
      }, [])

      useEffect(() => {   
        if(selectedPlace) {

        async function loadServices() {
          const res = await getPlaceServiceByUserId(user.user_id, selectedPlace)
          setServices(res)
        }        
    
        loadServices()
        }
       
      }, [selectedPlace])

      const handlePlaceChange = (event) => {
        setSelectedPlace(event.target.value);
        setServices([]);
        setSelectedService('');
        // Restablecer los estados cuando cambia la selección de lugar
        setExcelData(null);
        //setFileValid(true);
        setError(null);
      };

      const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
        // Restablecer los estados cuando cambia la selección de servicio
        setExcelData(null);
        //setFileValid(true);
        setError(null);
      };

      const handleFileUpload = (file) => {
        // Realiza acciones con el archivo, por ejemplo, procesar el archivo Excel.
        setSelectedFile(file);
         // Restablecer los estados cuando se carga un nuevo archivo
        setExcelData(null);
        //setFileValid(true);
        setError(null);
      };

      const handleConvertExcelToArray = () => {
        if (selectedFile && fileValid) {
          readExcelFile(selectedFile)
          .then((data) => {
            setExcelData(data);
            setError(null);
            //handleFileUpload(data);
          })
          .catch((err) => {
            //setFileValid(false)
            setError('Hubo un error al procesar el archivo Excel.');
            console.error(err);
          });
        }
        else {
          setError('No se ha cargado ningún archivo Excel.');          
        }
      }

      const readExcelFile = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            try {
              const data = new Uint8Array(e.target.result);
              const workbook = read(data, { type: 'array' });
              const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
              const jsonData = utils.sheet_to_json(firstSheet);
              resolve(jsonData);
            } catch (error) {
              reject(error);
            }
          };
          reader.readAsArrayBuffer(file);
        });
      };

      const handleSendDataToWorkAssignment = async () => {
        try {
          if (selectedFile && fileValid && selectedService && selectedPlace) {
            console.log('el place recibido es:' +  selectedPlace)
            console.log('el service recibido es:' +  selectedService)
            
            console.log('el excel data recibido es:', excelData)

            const responseData = await postWorkAssignment(selectedPlace, selectedService, excelData);
            // Maneja la respuesta de la API si es necesario
            console.log('Datos enviados con éxito', responseData);
          } else {
            setError('Por favor, asegúrate de cargar un archivo válido y seleccionar un lugar y un servicio.');
          }
        } catch (error) {
          console.error('Error al enviar datos a la API', error);
        }
      };

      console.log(places)
      console.log(services)
      console.log(selectedFile);
      console.log(excelData)
      console.log(selectedPlace)


    return (
        <>
            <Box
                m='20px 0'
                display='flex'
                justifyContent='space-evenly'
                flexWrap='wrap'
                gap='20px'
                sx={{ backgroundColor: colors.primary[400], width: '100%' }}
                padding='15px 10px'
                borderRadius='10px'
            >
               <PlaceSelect
                places ={places}
                selectedPlace={selectedPlace}
                handlePlaceChange={handlePlaceChange}
               />

                <ServiceSelect
                  services={services}
                  selectedService={selectedService}
                  handleServiceChange={handleServiceChange}
                />

              <FileUploadExcel handleFileUpload={handleFileUpload} fileValidCallback={setFileValid} />

              {error && <AlertMessage message={error} type="error" />} {/* Usa el componente de alerta */}

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleConvertExcelToArray();
                  handleSendDataToWorkAssignment();
                }}
                disabled={!selectedFile || !fileValid || !selectedService} 
              >
                Convertir Excel a Array
              </Button>

            </Box>            

        </>

    );
};
export default Index;