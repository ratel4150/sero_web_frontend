import React from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const MessageAlert = ({ title, severity }) => {

    // <Alert severity="error">This is an error alert — check it out!</Alert>
    // <Alert severity="warning">This is a warning alert — check it out!</Alert>
    // <Alert severity="info">This is an info alert — check it out!</Alert>
    // <Alert severity="success">This is a success alert — check it out!</Alert>

    return (
        <Stack sx={{ width: '100%', marginTop: '20px' }} spacing={2}>
            <Alert severity={severity}>{title}</Alert>
        </Stack>
    )
}

export default MessageAlert