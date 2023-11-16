import React from 'react'
import ImageCard from './components/ImageCard'
import { Box, Divider, Paper, Stack } from '@mui/material'
import { styled } from '@mui/material/styles';

/* const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  })); */
function PhotographsSections() {
  return (
    <>
    <Stack direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}>
        
        
  <ImageCard/>
  <ImageCard/>
  <ImageCard/>
        
    </Stack>
    <Stack direction="row"
    divider={<Divider orientation="vertical" flexItem />}
    spacing={2}>
        
        
  <ImageCard/>
  <ImageCard/>
  <ImageCard/>
        
    </Stack>
    </>
    
    
  )
}

export default PhotographsSections