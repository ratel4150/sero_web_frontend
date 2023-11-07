import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function PlaceSelect({ places, selectedPlace, handlePlaceChange }) {
  return (
    <TextField
      id="filled-select-places"
      select
      label="Plazas"
      variant="filled"
      sx={{ width: '45%' }}
      value={selectedPlace}
      onChange={handlePlaceChange}
    >
      {places.map((place) => (
        <MenuItem key={place.place_id} value={place.place_id}>
          {place.name}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default PlaceSelect;