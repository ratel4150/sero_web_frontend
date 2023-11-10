import React from "react";
import { Paper, Box } from "@mui/material";
import Fotografias from "../Fotografias";
import classNames from "../styles/classNames";

const FotografiasSection = ({ fotos }) => (
  <Box className={"nav-busqueda-contribuyente"}>
    <Paper className={classNames.articleHeader}>
      <Fotografias fotos={fotos} />
    </Paper>
  </Box>
);
export default FotografiasSection;
