import { Box,useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';
/**
 * Functional component representing a container with custom styling.
 *
 * @component
 * @param {Object} props - The component properties.
 * @param {React.ReactNode} props.children - The child components to be rendered within the container.
 * @returns {React.Component} The rendered Container component.
 */
function Container({children}) {
    /**
   * Accesses the current theme from the Material-UI theme provider.
   *
   * @type {function}
   */
  const theme = useTheme();
   /**
   * Retrieves color tokens based on the theme's palette mode.
   *
   * @type {Object}
   */
  const colors = tokens(theme.palette.mode);
  
  return (
    <Box
                m='20px 0'
                display='flex'
                justifyContent='space-evenly'
                flexWrap='wrap'
                gap='20px'
                padding='15px 10px'
                borderRadius='10px'
                sx={{ backgroundColor: colors.primary[400], width: '100%' }}
            >

        

        

     {""}
 {children}
       
</Box>
  )
}
// PropTypes for the component
/* Container.propTypes = {
  children: PropTypes.node.isRequired,
}; */

export default Container