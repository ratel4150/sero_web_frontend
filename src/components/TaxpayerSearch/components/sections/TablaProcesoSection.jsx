import React from "react";
import { Paper, Box } from "@mui/material";
import TablaProceso from "../TablaProceso";
import classNames from "../styles/classNames";

const TablaProcesoSection = () => (
  <Box className={"nav-busqueda-contribuyente"}>
    <Paper className={classNames.articleHeader}>
      <TablaProceso />
    </Paper>
  </Box>
);
export default TablaProcesoSection;
