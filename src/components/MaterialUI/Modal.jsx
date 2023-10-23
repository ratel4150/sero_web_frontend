import { useState } from 'react'
import { Modal, Box,Typography } from "@mui/material";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#1F2A40',
    color: '#ffffff',
    borderRadius: '7px',
    textAlign: 'center',
    border: '1px solid #70d8bd',
    boxShadow: 24,
    p: 4,
  };


export default function BasicModal({title}) {
    const [open, setOpen] = useState(true);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {title}
            </Typography>
          </Box>
        </Modal>
      </div>
    );
}