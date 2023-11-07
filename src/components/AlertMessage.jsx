import React from 'react';
import Typography from '@mui/material/Typography';

function AlertMessage({ message, type }) {
  return (
    <Typography variant="body2" color={type === 'error' ? 'error' : 'textPrimary'}>
      {message}
    </Typography>
  );
}

export default AlertMessage;