import { useState } from 'react'
import { Box, Button, useTheme, Modal, Typography } from '@mui/material';
import GridOnIcon from '@mui/icons-material/GridOn';
import { tokens } from "../theme";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 4,
    px: 4,
    pb: 4,
    borderRadius: '10px'
};

const ModalBox = ({ setShowModal, title, setShowModalGrid }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = useState(true);
    

    const handleClose = () => {
        setOpen(false);
        setShowModal(false)
    };
    
    const handleOpenGrid = () => {
        setShowModalGrid(true)
        setShowModal(false)
    }

    return (
        <div>
            {/* <Button onClick={handleOpen}>Open modal</Button> */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400 }}>
                    <Typography sx={{ fontSize: '16px', marginBottom: '10px' }}>Visualización de la información </Typography>
                    <p sx={{ marginTop: '10px' }} id="parent-modal-description">
                        Podrás ver los datos referente a {' '}
                        <Typography sx={{ color: colors.greenAccent[700], display: 'inline-block' }}> {title.toUpperCase()}</Typography>
                        {' '} o descargarlos
                    </p>
                    <Box
                        sx={{marginTop: '15px'}}
                    >
                        <Button variant="contained" endIcon={<GridOnIcon />} onClick={handleOpenGrid}
                            sx={{ backgroundColor: colors.greenAccent[600], marginRight: '10px' }}
                        >
                            Mostrar grid
                        </Button>
                        <Button variant="contained" endIcon={<GridOnIcon />}
                            sx={{ backgroundColor: colors.greenAccent[600] }}
                        >
                            Descargar
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

export default ModalBox