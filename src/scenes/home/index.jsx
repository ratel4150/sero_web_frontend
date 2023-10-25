import React from 'react'
import Lottie from 'lottie-react'
import { Box, useTheme, Typography } from "@mui/material";
import { tokens } from "../../theme";
import { useSelector } from 'react-redux'

import LottieData from '../../assets/company.json'

import Avatar from '../../assets/avatar-administrativo.png'

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';

import BarChartIcon from '@mui/icons-material/BarChart';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import MapIcon from '@mui/icons-material/Map';
import RepeatIcon from '@mui/icons-material/Repeat';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const index = () => {

  const user = useSelector(state => state.user)
  console.log(user)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (
    <Box m="40px" marginTop="0">

      <Box sx={{ width: '100%', marginBottom: '10px', backgroundColor: colors.primary[400] }}>
        <Card sx={{ backgroundColor: colors.primary[400] }}>
          <CardContent sx={{ backgroundColor: colors.primary[400], display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Box>
              <Typography variant="h5" color={colors.grey[100]} component="div" sx={{display: 'inline'}}>
                Bienvenido <Typography variant="h5" sx={{display: 'inline'}} color={colors.yellowAccent[700]}>{`${user.name}`}</Typography>
              </Typography>
              <Typography variant="h5" color={colors.grey[100]}>
                En el panel lateral izquierdo entontraras las diversas funciones a las que tienes acceso con el rol que se te proporciono, asi como las herramientas de la barra superior
              </Typography>
            </Box>
            <img src={Avatar} style={{ height: '100px' }} alt="" />
          </CardContent>
        </Card>
      </Box>

      <Box display='flex' justifyContent='center' alignItems='center' gap='10px' sx={{ backgroundColor: colors.primary[400] }}>

        <Box sx={{ width: '50%', backgroundColor: colors.primary[400], padding: '15px' }}>

          <Timeline position="alternate">

            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
              >
                Análisis
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color='success'>
                  <BarChartIcon className='text-white' />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Dashboard
                </Typography>
                <Typography>Reportes tabulares</Typography>
                <Typography>Reportes gráficos</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                variant="body2"
                color="text.secondary"
              >
                Mapas
              </TimelineOppositeContent>
              <TimelineSeparator >
                <TimelineConnector />
                <TimelineDot color="success">
                  <MapIcon className='text-white' />
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Capas geográficas
                </Typography>
                <Typography>Selección geoespacial</Typography>
                <Typography>Tracking operativo</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                variant="body2"
                color="text.secondary"
              >
                Administración
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="success">
                  <LaptopMacIcon className='text-white'/>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Usuarios
                </Typography>
                <Typography>Campañas</Typography>
                <Typography>Eventos</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color="success">
                  <RepeatIcon className='text-white'/>
                </TimelineDot>
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ py: '12px', px: 2 }}>
                <Typography variant="h6" component="span">
                  Óptimas herramientas
                </Typography>
                <Typography>para tu estratégia</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>


        </Box>

        <Box sx={{ width: '38%' }}>
          <Lottie animationData={LottieData} size={1000} />
        </Box>

      </Box>

    </Box>
  )
}

export default index





