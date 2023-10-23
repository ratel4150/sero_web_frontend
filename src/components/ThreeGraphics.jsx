import { useState, useEffect } from 'react'

// Material UI
import { Box, Typography, useTheme, Button } from "@mui/material";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SelectFormPregunta from "./MaterialUI/SelectFormPreguntaEncuesta"
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import LineChart from '../components/LineChart'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EmailIcon from "@mui/icons-material/Email";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import SelectFormSemana from "./MaterialUI/SelectFormSemana"
import StatBox from "../components/StatBox";;
import MapBoxMap from '../components/MapBoxMap'
import Spinner from '../components/MaterialUI/SpinnerCircle'

import { tokens } from "../theme";

import dashboardService from '../services/dashboard.service';



const ThreeGraphics = (
    {
        title = '', preguntasEncuesta, idPreguntaSeleccionada, handleChangePregunta, handleActivaFiltro, showFilter, semanas,
        semanaSeleccionada, handleChangeSemana, dataPregunta, dataPreguntaFilter, dataPreguntaLine, handleChangeFechaInit, handleChangeFechaEnd, handleFilterFechas, numeroPregunta, activaRange, campanaSeleccionada, encuestaSeleccionada, preguntaSeleccionada
    }
) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);


    const [showSemana, setShowSemana] = useState(false)
    const [showRange, setShowRange] = useState(false)

    const [showSpinner, setShowSpinner] = useState(false)

    const [fechaInit, setFechaInit] = useState('')
    const [fechaEnd, setFechaEnd] = useState('')

    const [fechaInitFormat, setFechaInitFormat] = useState('')
    const [fechaEndFormat, setFechaEndFormat] = useState('')


    const [numeroEncuestasFiltro, setNumeroEncuestasFiltro] = useState(0);
    const [numeroEncuestasContestadasFiltro, setNumeroEncuestasContestadasFiltro] = useState(0)
    const [diasTrabajadosFiltro, setDiasTrabajadosFiltro] = useState(0)


    useEffect(() => {
        getDataInit()
    }, [])

    useEffect(() => {
        if (semanaSeleccionada !== '') {
            getDataSemana()
        }
    }, [semanaSeleccionada])

    const handleRange = () => {
        setShowSemana(false)
        setShowRange(true)
    }

    const handleSemana = () => {
        setShowRange(false)
        setShowSemana(true)
    }

    const handleClear = () => {
        if (showFilter) getDataInit()
        setShowSemana(false)
        setShowRange(false)
        handleActivaFiltro()
    }

    const handleFechaInit = (e) => {
        handleChangeFechaInit(e)
        const dateInit = getFechaFormat(e)
        setFechaInit(dateInit)
    }

    const handleFechaEnd = (e) => {
        handleChangeFechaEnd(e)
        const dateEnd = getFechaFormat(e)
        setFechaEnd(dateEnd)
    }


    const handleFilterRange = () => {
        handleFilterFechas(numeroPregunta)
        getDataFecha()
    }

    const getDataInit = async () => {
        setShowSpinner(true)
        const { db_name, table_name_data, id_servicio_campana } = encuestaSeleccionada[0];
        const { field_table, cat_table_name, cat_field_name } = preguntaSeleccionada[0];
        console.log(field_table)

        const periodo_general = dashboardService.getPeriodoGeneral(db_name, table_name_data, id_servicio_campana)
        const encuestas_hechas = dashboardService.getEncuestasHechas(db_name, table_name_data, id_servicio_campana)
        const dias_trabajados = dashboardService.getDiasTrabajados(db_name, table_name_data, id_servicio_campana)

        const promesas = await Promise.all([periodo_general, encuestas_hechas, dias_trabajados])

        let periodos = promesas[0].data[0]
        setFechaInitFormat(periodos.periodo_inicial)
        setFechaEndFormat(periodos.periodo_final)

        // periodos -> fecha formateada visualizacion 19-04-2023
        let f1 = periodos.periodo_inicial.split('-')
        let f2 = periodos.periodo_final.split('-')
        let c1 = `${f1[2]}-${f1[1]}-${f1[0]}` // 2023-04-19
        let c2 = `${f2[2]}-${f2[1]}-${f2[0]}`

        const numero_encuestas_contestadas_filtro = await dashboardService.getNumeroEncuestasContestadasFiltro(2, db_name, table_name_data, cat_table_name, field_table, cat_field_name, c1, c2, id_servicio_campana, 'sin_semana')

        setFechaInit(c1)
        setFechaEnd(c2)
        setNumeroEncuestasFiltro(promesas[1].data[0].total_encuestas_hechas)
        setNumeroEncuestasContestadasFiltro(numero_encuestas_contestadas_filtro.data[0])
        setDiasTrabajadosFiltro(promesas[2].data[0])
        setShowSpinner(false)
    }

    const getDataFecha = async () => {
        setShowSpinner(true)
        const { db_name, table_name_data, id_servicio_campana } = encuestaSeleccionada[0];
        const { field_table, cat_table_name, cat_field_name } = preguntaSeleccionada[0];

        const numero_encuestas_filtro = dashboardService.getNumeroEncuestasFiltro(2, db_name, table_name_data, fechaInit, fechaEnd, id_servicio_campana, 'sin_semana')
        const numero_encuestas_contestadas_filtro = await dashboardService.getNumeroEncuestasContestadasFiltro(2, db_name, table_name_data, cat_table_name, field_table, cat_field_name, fechaInit, fechaEnd, id_servicio_campana, 'sin_semana')
        const dias_trabajados_filto = dashboardService.getDiasTrabajadosFiltro(2, 'sin_semana', fechaInit, fechaEnd)

        const promesas = await Promise.all([numero_encuestas_filtro, numero_encuestas_contestadas_filtro, dias_trabajados_filto])

        let f1 = fechaInit.split('-')
        let f2 = fechaEnd.split('-')
        let c1 = `${f1[2]}-${f1[1]}-${f1[0]}` // viene en este formato 19-04-2023
        let c2 = `${f2[2]}-${f2[1]}-${f2[0]}` // viene en este formato 19-04-2023

        setFechaInitFormat(c1)
        setFechaEndFormat(c2)

        setNumeroEncuestasFiltro(promesas[0].data[0].total)
        setNumeroEncuestasContestadasFiltro(promesas[1].data[0])
        setDiasTrabajadosFiltro(promesas[2].data[0])
        setShowSpinner(false)
    }

    const getDataSemana = async () => {
        setShowSpinner(true)
        const { db_name, table_name_data, id_servicio_campana } = encuestaSeleccionada[0];
        const { field_table, cat_table_name, cat_field_name } = preguntaSeleccionada[0];

        const periodo_filtro_semana = dashboardService.getPeriodoSemana(semanaSeleccionada)
        const numero_encuestas_filtro = dashboardService.getNumeroEncuestasFiltro(1, db_name, table_name_data, 'sin_fecha', 'sin_fecha', id_servicio_campana, semanaSeleccionada)
        const numero_encuestas_contestadas_filtro = await dashboardService.getNumeroEncuestasContestadasFiltro(1, db_name, table_name_data, cat_table_name, field_table, cat_field_name, 'sin_fecha', 'sin_fecha', id_servicio_campana, semanaSeleccionada)
        const dias_trabajados_filto = dashboardService.getDiasTrabajadosFiltro(1, semanaSeleccionada, 'sin_fecha', 'sin_fecha')

        const promesas = await Promise.all([periodo_filtro_semana, numero_encuestas_filtro, numero_encuestas_contestadas_filtro, dias_trabajados_filto])


        let periodos = promesas[0].data[0]
        setFechaInitFormat(periodos.periodo_inicial)
        setFechaEndFormat(periodos.periodo_final)

        // periodos -> 19-04-2023
        let f1 = periodos.periodo_inicial.split('-')
        let f2 = periodos.periodo_final.split('-')

        let c1 = `${f1[2]}-${f1[1]}-${f1[0]}`
        let c2 = `${f2[2]}-${f2[1]}-${f2[0]}`

        setFechaInit(c1)
        setFechaEnd(c2)
        setNumeroEncuestasFiltro(promesas[1].data[0].total)
        setNumeroEncuestasContestadasFiltro(promesas[2].data[0])
        setDiasTrabajadosFiltro(promesas[3].data[0])
        setShowSpinner(false)
    }


    const getFechaFormat = (e) => {
        let day = e.$D
        if (day.toString().length === 1) day = '0' + day
        let month = e.$M + 1
        if (month.toString().length === 1) month = '0' + month
        let year = e.$y
        return `${year}-${month}-${day}`
    }



    return (
        <>
            {title !== '' && (
                <Typography
                    variant="h5"
                    fontWeight="600"
                    sx={{ padding: "2px 30px 0 5px", marginTop: '30px', textAlign: 'center' }}
                    color={colors.greenAccent[400]}
                >
                    {title.toUpperCase()}
                </Typography>
            )}

            <SelectFormPregunta
                data={preguntasEncuesta}
                itemSeleccionado={idPreguntaSeleccionada}
                handleChange={handleChangePregunta}
            />

            {idPreguntaSeleccionada > 0 && (
                <Button onClick={handleClear}
                    sx={{ marginTop: '20px', backgroundColor: `${!showFilter ? '#3da58a' : '#af3f3b'}`, width: '70px', height: '51px' }}
                >
                    <FilterAltIcon
                        sx={{ fontSize: "26px", color: colors.blueAccent[100] }}
                    />
                </Button>
            )}

            {idPreguntaSeleccionada > 0 && showFilter && (
                <>
                    <Button onClick={handleRange}
                        sx={{ backgroundColor: `${showRange ? colors.blueAccent[700] : colors.grey[700]}`, color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "14px", marginTop: '20px', marginLeft: '10px' }}
                    >
                        <CalendarMonthIcon sx={{ mr: "10px" }} />
                        RANGO DE FECHAS
                    </Button>

                    <Button onClick={handleSemana}
                        sx={{ backgroundColor: `${showSemana ? colors.blueAccent[700] : colors.grey[700]}`, color: colors.grey[100], fontSize: "14px", fontWeight: "bold", padding: "14px", marginTop: '20px', marginLeft: '5px' }}
                    >
                        <CalendarViewWeekIcon sx={{ mr: "10px" }} />
                        SELECCIÓN SEMANA
                    </Button>


                    {showSemana && (
                        <SelectFormSemana data={semanas} itemSeleccionado={semanaSeleccionada} handleChange={handleChangeSemana} />
                    )}

                    {showRange && (
                        <>
                            <DatePicker
                                sx={{ marginTop: '20px', marginLeft: '10px', width: '21%' }}
                                onChange={handleFechaInit}
                                views={["year", "month", "day"]}
                                format="DD-MM-YYYY"
                                disableFuture
                                label='Fecha inicial'
                            />
                            <DatePicker
                                sx={{ marginTop: '20px', marginLeft: '10px', width: '21%' }}
                                onChange={handleFechaEnd}
                                views={["year", "month", "day"]}
                                format="DD-MM-YYYY"
                                disableFuture
                                label='Fecha final'
                            />
                            <Button onClick={handleFilterRange}
                                sx={{ marginTop: '20px', backgroundColor: '#3da58a', width: '70px', height: '50px', marginLeft: '10px' }}
                            >
                                <BeenhereIcon
                                    sx={{ fontSize: "26px", color: colors.blueAccent[100] }}
                                />
                            </Button>
                        </>
                    )}
                </>


            )
            }

            {
                idPreguntaSeleccionada > 0 && (
                    <div id={numeroPregunta.toString()}>
                        <Box
                            display="grid"
                            gridTemplateColumns="repeat(12, 1fr)"
                            gridAutoRows="140px"
                            gap="20px"
                            sx={{ marginTop: '20px' }}
                        >


                            {showSpinner === false ? (
                                <>
                                    <Box
                                        gridColumn="span 6"
                                        gridRow="span 2"
                                        display="grid"
                                        gridTemplateColumns="repeat(12, 1fr)"
                                        gridAutoRows="140px"
                                        gap="20px">
                                        <Box
                                            gridColumn="span 6"
                                            backgroundColor={colors.primary[400]}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <StatBox
                                                title={`${fechaInitFormat} / ${fechaEndFormat}`}
                                                subtitle="Periodo"
                                                progress={1}
                                                increase={`${100}%`}
                                                isSmall={true}
                                                icon={
                                                    <CalendarMonthIcon
                                                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                                    />
                                                }
                                            />
                                        </Box>
                                        <Box
                                            gridColumn="span 6"
                                            backgroundColor={colors.primary[400]}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <StatBox
                                                title={numeroEncuestasFiltro}
                                                subtitle="Número encuestas"
                                                progress={1}
                                                increase={`${100}%`}
                                                icon={
                                                    <EmailIcon
                                                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                                    />
                                                }
                                            />
                                        </Box>

                                        <Box
                                            gridColumn="span 6"
                                            backgroundColor={colors.primary[400]}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <StatBox
                                                title={numeroEncuestasContestadasFiltro.total}
                                                subtitle="Contestadas"
                                                progress={numeroEncuestasFiltro == 0 ? 0 : (numeroEncuestasContestadasFiltro.total / numeroEncuestasFiltro)}
                                                increase={numeroEncuestasFiltro == 0 ? 0 : ((numeroEncuestasContestadasFiltro.total / numeroEncuestasFiltro) * 100).toFixed(2) + '%'}
                                                icon={
                                                    <BookmarkAddedIcon
                                                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                                    />
                                                }
                                            />
                                        </Box>
                                        <Box
                                            gridColumn="span 6"
                                            backgroundColor={colors.primary[400]}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <StatBox
                                                title={diasTrabajadosFiltro.total_dias_habiles}
                                                subtitle="Días trabajados"
                                                progress={1}
                                                increase={`${100}%`}
                                                icon={
                                                    <AssignmentIndIcon
                                                        sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                                                    />
                                                }
                                            />
                                        </Box>
                                    </Box>

                                    <Box
                                        gridColumn="span 6"
                                        gridRow="span 2"
                                        display="grid"
                                        gridTemplateColumns="repeat(12, 1fr)"
                                        gridAutoRows="140px"
                                        gap="20px">

                                        <Box
                                            gridColumn='span 12'
                                            gridRow="span 2"
                                            backgroundColor={colors.primary[400]}
                                            padding="5px"
                                        >
                                            <MapBoxMap latitud={campanaSeleccionada[0].latitud} longitud={campanaSeleccionada[0].longitud}
                                                url_capa_geoserver={encuestaSeleccionada[0].url_capa_geoserver}
                                                url_capa_limite_municipal={encuestaSeleccionada[0].capa_limite_municipal_geoserver}
                                                isFilter={true} fechaInit={fechaInit}
                                                fechaEnd={fechaEnd}
                                            />
                                        </Box>
                                    </Box>
                                </>
                            ) : (
                                <Box
                                    gridColumn="span 12"
                                    gridRow="span 2"
                                    display="grid"
                                    justifyContent="center"
                                    gridTemplateColumns="repeat(12, 1fr)"
                                >
                                    <Box
                                        gridColumn="span 12"
                                    >
                                        <Spinner main={false} />
                                    </Box>

                                </Box>
                            )}



                            {/* PIE CHART */}
                            < Box
                                gridColumn={screen.width <= 450 ? 'span 12' : 'span 4'}
                                backgroundColor={colors.primary[400]}
                                gridRow="span 2"
                            >
                                <Box
                                    mt="10px"
                                    p="0 10px"
                                    display="flex "
                                    justifyContent="space-between"
                                    alignItems="center"
                                >

                                    <Typography
                                        variant="h5"
                                        fontWeight="600"
                                        sx={{ padding: "2px 30px 0 5px" }}
                                        color={colors.blueAccent[400]}
                                    >
                                        PIE CHART
                                    </Typography>
                                </Box>

                                <Box height="250px" m="-20px 0 0 0">
                                    <PieChart dataSQL={showSemana ? (semanaSeleccionada === '' ? dataPregunta : dataPreguntaFilter) : (!activaRange ? dataPregunta : dataPreguntaFilter)} />
                                </Box>
                            </Box>

                            {/* BAR CHART */}
                            <Box

                                gridColumn={screen.width <= 450 ? 'span 12' : 'span 8'}
                                gridRow="span 2"
                                backgroundColor={colors.primary[400]}
                            >

                                <Box
                                    mt="10px"
                                    p="0 10px"
                                    display="flex "
                                    justifyContent="space-between"
                                    alignItems="center"
                                >

                                    <Typography
                                        variant="h5"
                                        fontWeight="600"
                                        sx={{ padding: "5px 30px 0 30px" }}
                                        color={colors.blueAccent[400]}
                                    >
                                        BAR CHART
                                    </Typography>
                                </Box>

                                <Box height="295px" mt="-20px">
                                    <BarChart isMobile={screen.width <= 450 ? true : false}
                                        dataSQL={showSemana ? (semanaSeleccionada === '' ? dataPregunta : dataPreguntaFilter) : (!activaRange ? dataPregunta : dataPreguntaFilter)}
                                        tipo={dataPregunta[0]?.partido.includes(',') ? 2 : 1} />
                                </Box>
                            </Box>


                            {/* LINECHART */}
                            <Box
                                gridColumn="span 12"
                                gridRow="span 2"
                                backgroundColor={colors.primary[400]}
                            >
                                <Box
                                    mt="10px"
                                    p="0 30px"
                                    display="flex "
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            color={colors.blueAccent[400]}
                                        >
                                            LINE CHART
                                        </Typography>
                                    </Box>
                                </Box>
                                <br /><br />
                                <Box height="279px" width="95%" m="-30px 0 0 0">
                                    <LineChart isDashboard={true} dataChart={dataPreguntaLine} tipo={dataPregunta[0]?.partido.includes(',') ? 2 : 1} />
                                </Box>
                            </Box>

                        </Box>
                    </div>
                )
            }

        </>
    )
}

export default ThreeGraphics