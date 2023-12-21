import { Box, useTheme } from "@mui/material";
import React from "react";
import { tokens } from "../../theme";
/**
 * Contenedor reutilizable que aplica estilos específicos y colores.
 * @component
 * @param {Object} props - Propiedades del componente.
 * @param {React.ReactNode} props.children - Contenido que se renderizará dentro del contenedor.
 * @returns {React.ReactElement} El componente contenedor con estilos y colores aplicados.
 */
function Container({ children }) {
   /**
   * Hook de tema de Material-UI para acceder al tema actual.
   * @type {Object}
   */
  const theme = useTheme();
   /**
   * Objeto que almacena los colores del tema según el modo actual (claro/oscuro).
   * @type {Object}
   */
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      m="20px 0"
      display="flex"
      justifyContent="space-evenly"
      flexWrap="wrap"
      gap="20px"
      padding="15px 10px"
      borderRadius="10px"
      sx={{ backgroundColor: colors.primary[400], width: "100%" }}
    >
      {""}
      {children}
    </Box>
  );
}
// PropTypes for the component
/* Container.propTypes = {
  children: PropTypes.node.isRequired,
}; */

export default Container;
