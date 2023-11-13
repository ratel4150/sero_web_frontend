import { useState, useEffect, useRef } from 'react'
import { Box, useTheme, Typography } from '@mui/material'
import { tokens } from '../../theme'

// GRAPHICS
import Legend from '../../components/LightweightCharts/Legend'
import BarStack from '../../components/NivoChart/BarStack'
import Pie from '../../components/NivoChart/Pie'
import ProgressCircle from "../../components/ProgressCircle";

// ICONS
import NewspaperIcon from '@mui/icons-material/Newspaper';
import StatBox from '../../components/StatBox';
import Donut from '../../components/EChart/Donut';
import RecaudacionGestor from '../../components/RecaudacionGestor';

// DATA TEMP
import { data, data_campos_capturados, data_cuentas_pagadas, data_tipo_servicio_bar } from '../../data/BarStack'
import { data as data_pie, data_tipo_servicio } from '../../data/Pie'

const index = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box
            m='20px'
        >

            {/* RANGO DE FECHAS */}

            {/* FILA 1 datos generales */}
            <Box
                id="grid-1"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="100px"
                gap="15px"
                sx={{ margin: '10px 0' }}
            >


                <Box
                    gridColumn='span 3'
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                    // onClick={() => openModalBox('Jornadas')}
                    sx={{ cursor: 'pointer' }}
                >
                    <StatBox
                        title="Gestiones"
                        subtitle={1250}
                        icon={
                            <NewspaperIcon
                                sx={{ color: 'black', fontSize: "28px" }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn='span 3'
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                    // onClick={() => openModalBox('Jornadas')}
                    sx={{ cursor: 'pointer' }}
                >
                    <StatBox
                        title="Localizados"
                        subtitle={1250}
                        icon={
                            <NewspaperIcon
                                sx={{ color: 'black', fontSize: "28px" }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn='span 3'
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                    // onClick={() => openModalBox('Jornadas')}
                    sx={{ cursor: 'pointer' }}
                >
                    <StatBox
                        title="No localizados"
                        subtitle={1250}
                        icon={
                            <NewspaperIcon
                                sx={{ color: 'black', fontSize: "28px" }}
                            />
                        }
                    />
                </Box>

                <Box
                    gridColumn='span 3'
                    backgroundColor={colors.primary[400]}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="10px"
                    // onClick={() => openModalBox('Jornadas')}
                    sx={{ cursor: 'pointer' }}
                >
                    <StatBox
                        title="Gestores"
                        subtitle={1250}
                        icon={
                            <NewspaperIcon
                                sx={{ color: 'black', fontSize: "28px" }}
                            />
                        }
                    />
                </Box>


            </Box>

            {/* FILA 2 */}
            <Box
                id="grid-1"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="390px"
                gap="15px"
                sx={{ margin: '10px 0' }}
            >

                <Box
                    gridColumn='span 7'
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    sx={{ cursor: 'pointer' }}
                >
                    <Legend
                        title='Número de gestiones totales'
                        data=''
                        fecha_inicio=''
                        fecha_fin=''
                    />
                </Box>

                <RecaudacionGestor size_grid={5} />


            </Box>


            {/* FILA 3 */}
            <Box
                id="grid-1"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="300px"
                gap="15px"
                sx={{ margin: '10px 0' }}
            >

                <Box
                    gridColumn='span 3'
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                >
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{ padding: "10px 30px 0 20px" }}
                            color={colors.grey[100]}
                        >
                            Meta establecida
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            mt="25px"
                        >
                            <ProgressCircle size="125" progress={.25} />
                            <Typography
                                variant="h4"
                                color={colors.blueAccent[500]}
                                sx={{ mt: "15px" }}
                            >
                                40000
                            </Typography>
                            <Typography variant="h5"> {'24.96%'} </Typography>
                            <Typography> {'En progreso'} </Typography>
                        </Box>

                    </Box>
                </Box>

                <Box
                    gridColumn='span 9'
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    display='flex'
                    gap='10px'
                    alignItems='center'
                    sx={{ padding: '0 5px' }}
                >


                    <Pie data={data_tipo_servicio} theme='yellow_green_blue' />

                    <Pie data={data_pie} theme='accent' />


                </Box>

            </Box>

            {/* FILA 4 */}
            <Box
                id="grid-1"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="300px"
                gap="15px"
                sx={{ margin: '10px 0' }}
            >
                {/* GRAFICA DE BARRA MOSTRANDO TOTAL DE GESTIONES POR GESTOR Y CUANTAS FUERON LOCALIZADAS DOS BARRAS */}
                <Box
                    gridColumn='span 12'
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    sx={{ cursor: 'pointer' }}
                >
                    <BarStack data={data} position='vertical' color='nivo' keys={['localizado', 'no localizado']} groupMode={false} />
                </Box>
            </Box>

            {/* FILA 5 */}
            <Box
                id="grid-1"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="300px"
                gap="15px"
                sx={{ margin: '10px 0' }}
            >
                {/* GRAFICA DE BARRA MOSTRANDO TOTAL DE GESTIONES POR GESTOR Y CUANTAS FUERON LOCALIZADAS DOS BARRAS */}
                <Box
                    gridColumn='span 12'
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    sx={{ cursor: 'pointer' }}
                >
                    <BarStack data={data_campos_capturados} position='horizontal' color='pastel1' keys={['capturado', 'no capturado']}
                        groupMode={false}
                    />
                </Box>
            </Box>

            {/* FILA 6 */}
            <Box
                id="grid-1"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="300px"
                gap="15px"
                sx={{ margin: '10px 0' }}
            >
                {/* GRAFICA DE BARRA MOSTRANDO TOTAL DE GESTIONES POR GESTOR Y CUANTAS FUERON LOCALIZADAS DOS BARRAS */}
                <Box
                    gridColumn='span 12'
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    sx={{ cursor: 'pointer' }}
                >
                    <BarStack data={data_cuentas_pagadas} position='vertical' color='yellow_green'
                        keys={['gestionadas', 'pagadas']} groupMode={true} />
                </Box>
            </Box>

            {/* FILA 7 */}
            <Box
                id="grid-1"
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="300px"
                gap="15px"
                sx={{ margin: '10px 0' }}
            >
                {/* GRAFICA DE BARRA MOSTRANDO TOTAL DE GESTIONES POR GESTOR Y CUANTAS FUERON LOCALIZADAS DOS BARRAS */}
                <Box
                    gridColumn='span 12'
                    backgroundColor={colors.primary[400]}
                    borderRadius="10px"
                    sx={{ cursor: 'pointer' }}
                >
                    <BarStack data={data_tipo_servicio_bar} position='horizontal' color='nivo'
                        keys={['tipo servicio', 'no tipo servicio']} groupMode={false} />
                </Box>
            </Box>


        </Box>
    )
}

export default index