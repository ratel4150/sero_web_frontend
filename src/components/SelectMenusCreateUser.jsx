import React, { useState } from 'react'
import { Box, useTheme, Typography, Button, FormControlLabel, FormGroup, Switch } from '@mui/material'


import { tokens } from '../theme'

import { menus } from '../data/plazas'

const SelectMenusCreateUser = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    return (
        <Box
            m='20px 0'
            sx={{ backgroundColor: colors.primary[400], marginBottom: '20px', textAlign: 'center' }}
            padding='30px 10px'
            borderRadius='7px'
        >

            <Typography variant="caption" sx={{ fontSize: '16px', color: colors.grey[200] }}>
                Selecciona los menus
            </Typography>

            <Box
                display='flex'
                justifyContent='center'
                gap='20px'
                flexWrap='wrap'
                sx={{ marginTop: '20px' }}
            >
                {menus && menus.map(menu => (
                    <FormGroup >
                        <FormControlLabel control={<Switch color="success" sx={{ width: '70px' }} />}
                            label={menu.nombre}
                            onChange={e => handleSwitchProceso(e, menu.id_menu)}
                        />
                    </FormGroup>
                ))}
            </Box>

        </Box>
    )
}

export default SelectMenusCreateUser