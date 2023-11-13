import React from 'react'

// LIBRERIES
import Lottie from 'lottie-react'
import { Box, useTheme, Typography } from "@mui/material";
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player'

// COMPONENTS
import TimeLineHome from '../../components/TimeLineHome'
import Slider from '../../components/Slider'
import ToolsResume from '../../components/ToolsResume'

// STATICS
import Avatar from '../../assets/avatar-administrativo.png'
import Video from '../../assets/video/sero_space.mp4'
import LottieData from '../../assets/company.json'
import { tokens } from "../../theme";


const index = () => {

  const user = useSelector(state => state.user)
  console.log(user)
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  return (

    <Box m="20px" marginTop="0" sx={{ backgroundColor: colors.primary[400], borderRadius: '10px', padding: '0 0 40px 0' }}>

      <Box sx={{ width: '100%', marginBottom: '5px' }}>

        <Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Box sx={{ padding: '0 20px' }}>
            <Typography variant="h5" color={colors.grey[100]} component="div" sx={{ display: 'inline' }}>
              Bienvenido <Typography variant="h5" sx={{ display: 'inline' }} color={colors.greenAccent[700]}>{`${user.name}`}</Typography>
            </Typography>
            <Typography variant="h5" color={colors.grey[100]}>
              En el panel lateral izquierdo entontraras las diversas funciones a las que tienes acceso con el rol que se te proporciono, asi como las herramientas de la barra superior.
            </Typography>
          </Box>
          <img src={Avatar} style={{ height: '150px', marginTop: '10px', marginRight: '50px' }} alt="" />
        </Box>

      </Box>

      <Box display='flex' justifyContent='center' alignItems='center' gap='10px'
        sx={{ borderRadius: '10px' }}
      >

        <Box sx={{ width: '50%', padding: '15px' }}>
          <TimeLineHome />
        </Box>

        <Box sx={{ width: '38%' }}>
          <Lottie animationData={LottieData} size={1000} />
        </Box>

      </Box>

      <Box sx={{ marginTop: '-100px' }}>
        <Slider />
      </Box>

      <Box sx={{ backgroundColor: colors.primary[400] }}>
        <ReactPlayer url={Video} playing={true} muted={true} width='100%' height='400px' loop={true}
          style={{ backgroundColor: colors.primary[400] }} />
      </Box>

      <Box sx={{ marginTop: '-150px' }}>
        <ToolsResume />
      </Box>

    </Box>
  )
}

export default index





