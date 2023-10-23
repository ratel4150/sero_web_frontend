import { Box, CircularProgress } from '@mui/material'

const SpinnerCircle = ({main=true}) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginTop: main ? '200px' : '100px' }}>
            <CircularProgress color="secondary" sx={{ marginRight: '20px' }} />
            <CircularProgress color="success" sx={{ marginRight: '20px' }} />
            <CircularProgress color="inherit" />
        </Box>
    )
}

export default SpinnerCircle