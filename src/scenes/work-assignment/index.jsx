import React, { useState, useEffect } from "react";

import { tokens } from "../../theme";
import PlaceSelect from '../../components/PlaceSelect'
import ServiceSelect from '../../components/ServiceSelect'
import AlertMessage from "../../components/AlertMessage";
import { useSelector } from 'react-redux'// material ui
import { Box, useTheme, Button} from "@mui/material";

const Index = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const user = useSelector(state => state.user)    
    const [selectedPlace, setSelectedPlace] = useState('');
    const [selectedService, setSelectedService] = useState('');    
    const [error, setError] = useState(null);

   

      const handlePlaceChange = (event) => {
        setSelectedPlace(event.target.value);  
        setSelectedService('');      
      };

      const handleServiceChange = (event) => {
        setSelectedService(event.target.value);        
      };  

      console.log(selectedPlace)
      console.log(selectedService)


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
                selectedPlace={selectedPlace}
                handlePlaceChange={handlePlaceChange}
               />

                <ServiceSelect
                  selectedPlace={selectedPlace}                  
                  selectedService={selectedService}
                  handleServiceChange={handleServiceChange}
                />

              {/* <FileUploadExcel handleFileUpload={handleFileUpload} fileValidCallback={setFileValid} /> */}

              {error && <AlertMessage message={error} type="error" />} {/* Usa el componente de alerta */}

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  handleConvertExcelToArray();
                  handleSendDataToWorkAssignment();
                }}
                disabled={ !selectedService} 
              >
                Convertir Excel a Array
              </Button>

            </Box>            

        </>

    );
};
export default Index;