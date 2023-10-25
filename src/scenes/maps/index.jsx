import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'

import { getPlacesByUserId } from '../../services/place.service'

import { useNavigate } from 'react-router-dom'

const index = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigation = useNavigate()

    const user = useSelector(state => state.user)

    const [plazas, setPlazas] = useState()

    useEffect(() => {
        getPlazasByUser()
    }, [])

    const getPlazasByUser = async () => {
        const res = await getPlacesByUserId(user.user_id)
        setPlazas(res)
    }

    return (
        <Box
            m='20px'
            padding='20px 10px'
        >

            <Header title="Mapa GIS" subtitle="Selecciona la plaza" />

            <Box display='flex' justifyContent='space-evenly' alignItems='center' 
            sx={{ backgroundColor: colors.primary[400], marginTop: '20px', height: '300px', borderRadius: '7px' }}>

                {plazas && plazas.length > 0 && plazas.map(plaza => (
                    <Box sx={{ padding: '20px', borderRadius: '7px' }} id={plaza.place_id} >
                        <Typography variant="caption" sx={{ display: 'inline-block', fontSize: '14px', color: colors.greenAccent[400] }}>
                            {plaza.name}
                        </Typography>
                        <img src={`https://www.ser0.mx/ser0/image/plaza/${plaza.image}`} alt="logo imagen" style={{ width: '120px', height: '120px', marginBottom: '10px' }} />
                        <Button sx={{ width: '100%', backgroundColor: colors.greenAccent[400] }} onClick={() => navigation(`/map/${plaza.place_id}`)}>
                            Abrir mapa
                        </Button>
                    </Box>
                ))}

            </Box>

        </Box>
    )
}

export default index