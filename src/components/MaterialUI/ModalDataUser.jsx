import { useState } from 'react'
import { Modal, Box, Typography } from "@mui/material";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'rgba(0,0,0, 0.6)',
  color: '#ffffff',
  borderRadius: '10px',
  textAlign: 'center',
  border: '1px solid #70d8bd',
  boxShadow: 24,
  p: 4,
};


export default function ModalDataUser({ user, setShowModal }) {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false)
    setShowModal(false)
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src="avatar.jpg" alt="" style={{ width: '200px', height: '200px', margin: '0 auto', marginBottom:'10px', borderRadius:'5px' }} />
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Nombre: <span style={{color: '#4cceac', marginLeft: '10px'}}> Antonio Ezequiel Ticante Pérez </span>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Username: <span style={{color: '#4cceac', marginLeft: '10px'}}> antonio.ticante@ser0.mx </span>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Puesto: <span style={{color: '#4cceac', marginLeft: '10px'}}> Administrador </span>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Plazas: <span style={{color: '#4cceac', marginLeft: '10px'}}> Demo, Cuautitlan Izcalli, Naucalpan </span>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Fecha nacimiento: <span style={{color: '#4cceac', marginLeft: '10px'}}> 12 Septiembre 1989 </span>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Edad: <span style={{color: '#4cceac', marginLeft: '10px'}}> 33 </span>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Telefono personal: <span style={{color: '#4cceac', marginLeft: '10px'}}> 5531284105 </span> 
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Telefono empresa:<span style={{color: '#4cceac', marginLeft: '10px'}}></span>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Fecha ingreso: <span style={{color: '#4cceac', marginLeft: '10px'}}> 09 Febrero 2022 </span>
          </Typography>
          <Typography id="modal-modal-title" variant="h5" component="h2" sx={{marginBottom:'5px'}}>
            Fecha baja: <span style={{color: '#4cceac', marginLeft: '10px'}}></span>
          </Typography>

        </Box>
      </Modal>
    </div>
  );
}