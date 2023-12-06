import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

function BackDrop({handelOpenBackDrop,handelCloseBackDrop,openBackDrop}) {
    console.log(openBackDrop);
  return (
    
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openBackDrop}
      onClick={handelCloseBackDrop}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  )
}

export default BackDrop