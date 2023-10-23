import * as React from 'react';
import { Box, Typography, useTheme } from "@mui/material";
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { tokens } from "../../theme";


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


import CheckCircleIcon from '@mui/icons-material/CheckCircle';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [open, setOpen] = React.useState(false);

    const [user, setUser] = React.useState([]);

    React.useEffect(() => {
        const user_res = localStorage.getItem('user');
        const user = JSON.parse(user_res)
        //console.log(user);
        if (user) {
            setUser(user)
        }
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton onClick={handleClickOpen}>
                <PersonOutlinedIcon color="action" />
            </IconButton>

            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle fontSize={16} textAlign="center" color="#4cceac" >{"Perfil de usuario".toUpperCase()}</DialogTitle>
                <DialogContent sx={{ width: '600px', textAlign: 'center' }}>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Card sx={{ maxWidth: '100%' }}>
                            <CardMedia
                                sx={{ height: 200, width: 200, margin: '0 auto', marginTop: '20px', borderRadius: '50%' }}
                                image={user.profile_img}
                                src={user.profile_img}
                                title="Imagen user"
                            />
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Typography color={colors.blueAccent[200]} gutterBottom variant="h4" >
                                    {user?.nombre} {user.apellido_paterno} {user.apellido_materno}
                                </Typography>
                                <Typography color={colors.blueAccent[200]} gutterBottom variant="h5" >
                                    {user?.nombre_rol?.toUpperCase().replaceAll('_', ' ')}
                                </Typography>
                                <Typography color={colors.blueAccent[200]} gutterBottom variant="h5" >
                                    {user?.username}
                                </Typography>
                                <Typography color={colors.blueAccent[200]} gutterBottom variant="h5" >
                                    {user?.fecha_nacimiento}
                                </Typography>
                                <Typography color={colors.blueAccent[200]} gutterBottom variant="h5" >
                                    Activo
                                </Typography>

                                <Typography sx={{ marginTop: '25px' }} color={colors.greenAccent[500]} gutterBottom variant="h5">
                                    Campañas activas
                                </Typography>


                                <Typography color={colors.blueAccent[200]} gutterBottom variant="h5">
                                    Preferencia Electoral Cuautitlán Izcalli
                                </Typography>
                            </CardContent>
                        </Card>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        sx={{
                            backgroundColor: colors.greenAccent[700],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                    >
                        <CheckCircleIcon sx={{ mr: "10px" }} />
                        Aceptar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}