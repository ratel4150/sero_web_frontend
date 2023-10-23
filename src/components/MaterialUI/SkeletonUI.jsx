import React from 'react'
import { Box, Skeleton } from '@mui/material'


const SkeletonUI = () => {
    return (
        <Box display="flex" alignItems="center"  sx={{marginTop: '20px', flexWrap: 'wrap', gap: '20px'}} >
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton variant="rectangular" height={250} sx={{width:'31%'}} />

            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton variant="rectangular" height={250} sx={{width:'66%'}} />
            <Skeleton variant="rounded" height={250} sx={{width:'100%'}} />
        </Box>
    )
}

export default SkeletonUI