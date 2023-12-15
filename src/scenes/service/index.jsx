import React from 'react'
import Header from "../../components/Header";
import ServiceCrudModule from '../../components/ServiceCrudModule';
import { useSelector } from 'react-redux';
import { tokens } from '../../theme';
import { Box, useTheme } from '@mui/material';
function Service() {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
    <Header title="Gestiòn de Servicios" subtitle="Operaciones de Crear, Leer, Actualizar y Eliminar Servicios en el Sistema" />
     <ServiceCrudModule/>
    
  </Box>
  )
}

export default Service