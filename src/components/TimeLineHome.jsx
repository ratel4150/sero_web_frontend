import React from 'react'
import { Typography } from '@mui/material';
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

const TimeLineHome = () => {
    return (

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
                        <LaptopMacIcon className='text-white' />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography variant="h6" component="span">
                        Usuarios
                    </Typography>
                    <Typography>Plazas</Typography>
                    <Typography>Procesos</Typography>
                </TimelineContent>
            </TimelineItem>

            <TimelineItem>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="success">
                        <RepeatIcon className='text-white' />
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
    )
}

export default TimeLineHome