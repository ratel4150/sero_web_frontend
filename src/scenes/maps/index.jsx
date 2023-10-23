import React from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { plazas } from '../../data/plazas'
import { tokens } from '../../theme'
//import MessageAlert from '../../components/MessageAlert'
import Header from '../../components/Header'

import { useNavigate } from 'react-router-dom'

const index = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigation = useNavigate()

    return (
        <Box
            m='20px'
            padding='20px 10px'
        >

            <Header title="Mapa GIS" subtitle="Selecciona la plaza" />

            <Box display='flex' justifyContent='space-evenly' alignItems='center' 
            sx={{ backgroundColor: colors.primary[400], marginTop: '20px', height: '300px', borderRadius: '7px' }}>

                {plazas && plazas.map(plaza => (
                    <Box sx={{ padding: '20px', borderRadius: '7px' }} id={plaza.id_plaza.toString()} >
                        <Typography variant="caption" sx={{ display: 'inline-block', fontSize: '14px', color: colors.greenAccent[400] }}>
                            {plaza.nombre}
                        </Typography>
                        <img src={plaza.imagen} alt="logo imagen" style={{ width: '120px', height: '120px', marginBottom: '10px' }} />
                        <Button sx={{ width: '100%', backgroundColor: colors.greenAccent[400] }} onClick={() => navigation('/map')}>
                            Abrir mapa
                        </Button>
                    </Box>
                ))}

            </Box>

        </Box>
    )
}

export default index