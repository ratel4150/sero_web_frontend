import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function ServiceSelect({ services, selectedService, handleServiceChange }) {
  return (
    <TextField
      id="filled-select-service"
      select
      label="Servicio"
      variant="filled"
      sx={{ width: '45%' }}
      value={selectedService}
      onChange={handleServiceChange}
    >
      {services.map((service) => (
        <MenuItem key={service.service_id} value={service.service_id}>
          {service.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default ServiceSelect;