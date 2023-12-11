import React from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import TaskCrudModule from "../../components/taskCrudModule";
function Task() {
  const user = useSelector((state) => state.user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="Gestiòn de Tareas" subtitle="Operaciones de Crear, Leer, Actualizar y Eliminar Tareas en el Sistema" />
    <TaskCrudModule/>
      
    </Box>
  );
}

export default Task;
