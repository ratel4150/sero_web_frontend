import { AccountCircle } from '@mui/icons-material'
import { Box, Divider, IconButton, InputAdornment, Stack, TextField, Tooltip } from '@mui/material'
import React from 'react'
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import ListIcon from '@mui/icons-material/List';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PersonIcon from '@mui/icons-material/Person';
import { useStoreZustand } from '../../../../zustan_store/useStoreZustand';
import { IoIosHelpCircle } from "react-icons/io";
function ContributorInfo() {
  const {informationContributorPersonalData}=useStoreZustand()
  const[help,setHelp]=React.useState(false)


  


  
  
  return (
    <>
   {/*   <Tooltip title="Ayuda">
  <IconButton onClick={()=>{
    if (help) {
      setHelp(false)
      
    }else{
      setHelp(true)
    }
  }}>
    <IoIosHelpCircle />
  </IconButton>
</Tooltip> */}
    <Box sx={{display:"flex",flexDirection:"column"}}>
   
    <TextField
        helperText={help?"Informaciòn de la cuenta":null}
        color='secondary'
        sx={{marginBottom:"1rem"}}
        id="input-with-icon-textfield"
        label="Cuenta"
        value={informationContributorPersonalData?.account || "" }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RecentActorsIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        variant="standard"
      />
         <TextField
         helperText={help?"Informaciòn del propietario":null}
         color='secondary'
        size='small'
        sx={{width:"13rem"}}
        id="input-with-icon-textfield"
        label="Propietario"
        value={informationContributorPersonalData?.["owner_name"] || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        variant="standard"
      />

   </Box>
   
     
    
        

   
   <Box sx={{display:"flex",flexDirection:"column"}}>
    <TextField
    helperText={help?"Informaciòn del servicio":null}
    color='secondary'
        sx={{marginBottom:"1rem"}}
        id="input-with-icon-textfield"
        label="Servicio"
        value={informationContributorPersonalData?.["type_service"] || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ListIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        variant="standard"
      />
         <TextField
         helperText={help?"informaciòn de la tarifa":null}
         color='secondary'
        size='small'
        sx={{width:"13rem"}}
        id="input-with-icon-textfield"
        label="Tipo de tarifa"
        value={informationContributorPersonalData?.["rate_type"] || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <ReviewsIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        variant="standard"
      />

   </Box>
   <Box sx={{display:"flex",flexDirection:"column"}}>
    <TextField
    helperText={help?"Informaciòn del turno":null}
    color='secondary'
        sx={{marginBottom:"1rem"}}
        id="input-with-icon-textfield"
        label="Turno"
        value={informationContributorPersonalData?.turn || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <RecentActorsIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        variant="standard"
      />
         <TextField
         helperText={help?"Informaciòn de la serie del medidor":null}
         color='secondary'
        size='small'
        sx={{width:"13rem"}}
        id="input-with-icon-textfield"
        label="Serie de Medidor"
        value={informationContributorPersonalData?.["meter_series"] || ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <GasMeterIcon />
            </InputAdornment>
          ),
          readOnly: true,
        }}
        variant="standard"
      />

   </Box>
   
    </>
   
  )
}

export default ContributorInfo