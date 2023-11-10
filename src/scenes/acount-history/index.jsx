import { Box, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../../theme';
import { useSelector } from 'react-redux';
import TaxPayerSearch from '../../components/TaxpayerSearch';

function AcountHistory() {
  const user = useSelector(state => state.user)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="40px" marginTop="0">
      <Box sx={{ width: '100%', marginBottom: '10px', backgroundColor: colors.primary[400] }}>
         <TaxPayerSearch/>
      </Box>
     
    </Box>

  )
}

export default AcountHistory