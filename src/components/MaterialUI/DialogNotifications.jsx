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
import Badge from '@mui/material/Badge'
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import { tokens } from "../../theme";


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


import LogoPulso from '../../assets/logo_pulso_democratico_fondoclaro.png'

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import BlockIcon from '@mui/icons-material/Block';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [user, setUser] = React.useState();
    const [open, setOpen] = React.useState(false);


    React.useEffect(() => {
        const user_res = localStorage.getItem('user');
        const user = JSON.parse(user_res)
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
            <Badge badgeContent={0} color="secondary">
                <IconButton onClick={handleClickOpen}>
                    <NotificationsOutlinedIcon color="action" />
                </IconButton>
            </Badge>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle fontSize={16} textAlign="center" color="#4cceac" >{'CENTRO DE NOTIFICACIONES - ' + user?.nombre?.toUpperCase()}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <Card sx={{ maxWidth: 500 }}>
                            {/* <CardMedia
                                sx={{ height: 100, width: 240, margin: '0 auto', marginTop: '20px' }}
                                image={LogoPulso}
                                title="Pulso democrático"
                            /> */}
                            <CardContent sx={{textAlign: 'center'}}>
                                <BlockIcon  sx={{fontSize:'100px', color: colors.redAccent[400], marginBottom:'20px'}} />
                                <Typography color={colors.redAccent[500]} gutterBottom variant="h3" component="div" sx={{textAlign: 'center'}}>
                                    SIN NOTIFICACIONES
                                </Typography>
                            </CardContent>
                            {/* <CardActions>
                                <Button
                                    onClick={handleClose}
                                    sx={{
                                        backgroundColor: colors.blueAccent[500],
                                        color: colors.grey[100],
                                        fontSize: "12px",
                                        fontWeight: "bold",
                                        padding: "10px 10px",
                                    }}
                                >
                                    <BookmarkAddedIcon sx={{ mr: "10px" }} />
                                    Marcar como leida
                                </Button>
                            </CardActions> */}
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