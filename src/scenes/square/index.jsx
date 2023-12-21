import React from 'react'
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import SquareCrudModule from '../../components/SquareCrudModule';
function Square() {
    const user = useSelector((state) => state.user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
          <Header title="Gestiòn de plazas" subtitle="Operaciones de Crear, Leer, Actualizar y Eliminar Plazas en el Sistema" />
          <SquareCrudModule/>
    </Box>
  )
}

export default Square