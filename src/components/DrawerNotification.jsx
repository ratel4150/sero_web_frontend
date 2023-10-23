import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';
import { Typography, useTheme } from '@mui/material'
import { tokens } from "../theme";

export default function SwipeableTemporaryDrawer({ state, toggleDrawer }) {


    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 320 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Typography
                    variant="h5"
                    color={colors.grey[300]}
                    sx={{ marginBottom: '10px', marginLeft: '10px' }}
                >
                    CENTRO DE NOTIFICACIONES
                </Typography>
                {['Notificación 5', 'Notificación 6', 'Notificación 7'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                            <ListItemIcon>
                                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                                    <Button sx={{ backgroundColor: '#6870fa' }}>
                                        <MarkEmailReadIcon />
                                    </Button>
                                    <Button sx={{ backgroundColor: '#db4f4a' }}>
                                        <DeleteIcon />
                                    </Button>
                                </ButtonGroup>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Typography
                variant="h5"
                color={colors.grey[300]}
                sx={{ margin: '10px' }}
            >
                NOTIFICACIONES LEIDAS
            </Typography>
            <List>
                {['Notificación 1', 'Notificación 2', 'Notificación 3', 'Notificación 4',].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <div>
            <React.Fragment key={'right'}>
                <SwipeableDrawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                    onOpen={toggleDrawer('right', true)}
                >
                    {list('right')}
                </SwipeableDrawer>
            </React.Fragment>
        </div>
    );
}