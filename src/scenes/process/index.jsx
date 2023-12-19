import React from 'react'

import Header from "../../components/Header";

import { useSelector } from 'react-redux';
import { tokens } from '../../theme';
import { Box, useTheme } from '@mui/material';
import ProcesCrudModule from '../../components/ProcessCrudModule';

function Process() {
  return (
    <Box m="20px">
    <Header title="Gestiòn de Procesos" subtitle="Operaciones de Crear, Leer, Actualizar y Eliminar Procesos en el Sistema" />
     <ProcesCrudModule/>
    
  </Box>
  )
}

export default Process