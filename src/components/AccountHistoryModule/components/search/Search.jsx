import { Button, InputAdornment, MenuItem, TextField } from '@mui/material'
import React from 'react'
import PlaceIcon from '@mui/icons-material/Place';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import SearchIcon from '@mui/icons-material/Search';
function Search() {
  return (
<>
<TextField
            id="filled-select-currency"
            select
            label="Plaza"
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                   <PlaceIcon/>
                  </InputAdornment>
              ),
          }}
            variant="filled"
            sx={{ width: '45%' }}
            defaultValue=""
            onChange={(e) => changeControl(e, 'plaza')}
            
        >
            <MenuItem key="1" value="1"> No sabe</MenuItem>
            <MenuItem key="2" value="2"> Cuautitlàn Izcalli </MenuItem>
            <MenuItem key="3" value="3"> Cuautitlan Mèxico</MenuItem>
            <MenuItem key="4" value="4"> Naucalpan</MenuItem>
            
        </TextField>

        <TextField
            id="input-with-icon-textfield"
            label="Cuenta"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                     <AccountTreeIcon/>
                    </InputAdornment>
                ),
            }}
            variant="filled" color="success"
            sx={{ width: '31%' }}
            onChange={(e) => changeControl(e, 'cuenta')}
        />
        <Button variant="contained" startIcon={<SearchIcon />}>
  Bùsqueda
</Button>
</>  )
}

export default Search