import { Tab, Tabs } from '@mui/material'

import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import PaidIcon from '@mui/icons-material/Paid';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
function NavTabs({value,handleChange}) {

  
  return (
    <Tabs  value={value} onChange={handleChange}  aria-label="icon tabs example">
    <Tab icon={<PersonIcon />} label="Contribuyente" value={"Contributor"}/>
    <Tab icon={<PaymentIcon />} label="Adeudos" value={"Debt"}/>
    <Tab icon={<PaidIcon />} label="Pagos" value={"Payments"}/>
    <Tab icon={<SupervisedUserCircleIcon />} label="Acciones" value={"PerformedActions"}/>
    <Tab icon={<PhotoCameraIcon />} label="Fotografias" value={"CapturedPhotographs"}/>
  </Tabs>
  )
}

export default NavTabs