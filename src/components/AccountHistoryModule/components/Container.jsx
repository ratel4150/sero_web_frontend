import { Box,useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../../theme';
import PropTypes from 'prop-types';
/**
 * React component for a container with specific styling.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child elements to be rendered within the container.
 * @returns {JSX.Element} - The rendered component.
 */
function Container({children}) {
  const theme = useTheme();
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
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container