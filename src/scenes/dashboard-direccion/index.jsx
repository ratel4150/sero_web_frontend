import { useContext, useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Button, useTheme, Typography, ButtonGroup, FormControl, Select, MenuItem, Chip, Avatar } from "@mui/material";

import DiscountIcon from '@mui/icons-material/Discount';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Person4Icon from '@mui/icons-material/Person4';

// data
import { numero_gestiones } from '../../data/gestiones'
import { mockBarData } from '../../data/recaudado'

// components
import RecaudacionGestor from '../../components/RecaudacionGestor';
import PorcentajeGestor from '../../components/PorcentajeGestor';
import BarChart from '../../components/BarChart'


import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EmailIcon from "@mui/icons-material/Email";

import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
//import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import AddCommentIcon from '@mui/icons-material/AddComment';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import { ColorModeContext, tokens } from "../../theme";



import Header from "../../components/Header";
import SelectFormControl from '../../components/MaterialUI/SelectFormControl';
import SelectFormControlEncuesta from '../../components/MaterialUI/SelectFormControlEncuesta';
import StatBox from "../../components/StatBox";
import Spinner from '../../components/MaterialUI/SpinnerCircle'
import LineChart from "../../components/LineChart";
import ProgressCircle from "../../components/ProgressCircle";
import MapBoxMap from '../../components/MapBoxMap'
import SkeletonUI from '../../components/MaterialUI/SkeletonUI'
import Modal from '../../components/MaterialUI/Modal'

import PdfView from '../../components/PdfView'

// services
import campanaService from '../../services/campana.service'
import encuestaService from '../../services/encuesta.service'
import dashboardService from '../../services/dashboard.service'

// libreries
//import { useReactToPrint } from 'react-to-print'
//import { CSVLink } from 'react-csv';
import html2Canvas from 'html2canvas'
import { PDFDownloadLink } from '@react-pdf/renderer'



const Home = () => {

  const colorMode = useContext(ColorModeContext);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const handleChangePeriodo = (e) => {

  }


  return (

    <Box m="20px" marginTop="0">

      {/* FILA 1 datos generales */}
      <Box
        id="grid-1"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        sx={{ marginTop: '10px' }}
      >

        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title="Contratos activos"
            subtitle={3}
            icon={
              <BookmarkAddedIcon
                sx={{ color: 'white', fontSize: "28px" }}
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
        >
          <StatBox
            title="Plazas activas"
            subtitle={2}
            icon={
              <DiscountIcon
                sx={{ color: 'white', fontSize: "28px" }}
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
        >
          <StatBox
            title="Gestores"
            subtitle={72}
            icon={
              <EngineeringIcon
                sx={{ color: 'white', fontSize: "28px" }}
              />
            }
            image={true}
            src='avatar-gestor.png'
          />
        </Box>

        <Box
          gridColumn='span 3'
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="10px"
        >
          <StatBox
            title="Administrativos"
            subtitle={20}
            icon={
              <Person4Icon
                sx={{ color: 'white', fontSize: "28px" }}
              />
            }
            image={true}
            src='avatar-administrativo.png'
          />
        </Box>

      </Box>

      {/* FILA 2 gestiones realizadas generales */}
      <Box
        gridColumn="span 12"
        gridRow="span 2"
        backgroundColor={colors.primary[400]}
        borderRadius='10px'
      >
        <Box
          mt="20px"
          p="0 30px"
          display="flex "
          justifyContent="space-between"
          alignItems="center"
        >
          <Box sx={{ padding: '15px 0' }}>
            <Typography
              variant="h5"
              color={colors.greenAccent[400]}
              sx={{ marginBottom: '10px' }}
            >
              Número de gestiones realizadas
            </Typography>

            <Box display="flex" alignItems="center">
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button sx={{ backgroundColor: colors.greenAccent[500] }}>Año</Button>
                <Button>Mes</Button>
                <Button>Semana</Button>
              </ButtonGroup>

              <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={1}
                  label="Age"
                  onChange={handleChangePeriodo}
                >
                  <MenuItem value={1}>
                    <em>Selecciona</em>
                  </MenuItem>
                  <MenuItem value={20}>2022</MenuItem>
                  <MenuItem value={30}>2023</MenuItem>
                </Select>
              </FormControl>
            </Box>

          </Box>
        </Box>

        <Box height="250px" m="-20px 0 0 0">
          <LineChart isDashboard={true} dataChart={numero_gestiones} isTotal={true} />
        </Box>
      </Box>

      {/* FILA 3 Recaudado por gestor */}
      <Box
        id="grid-1"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="471px"
        gap="20px"
        sx={{ marginTop: '20px', marginBottom: '20px' }} >


        {/* COMPONENTE DE RECAUDACION POR GESTORES */}
        <RecaudacionGestor size_grid='7' />

        {/*  COMPONENTE DE PORCENTAJE DE LO RECAUDADO POR GESTOR */}
        <PorcentajeGestor size_grid='5' />


      </Box>

      <Box
        gridColumn='span 12'
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
            sx={{ padding: "20px 30px 0 30px" }}
            color={colors.greenAccent[500]}
          >
            Recaudado en plazas
          </Typography>
        </Box>

        <Box height="270px">
          <BarChart data={mockBarData} /> 
        </Box>
      </Box>

    </Box >


  )
}


export default Home;






