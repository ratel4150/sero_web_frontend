import { useState } from 'react'

import { Box, IconButton, useTheme, Typography, Avatar, Menu, MenuItem } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import DrawerNotification from '../../components/DrawerNotification'

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AppsIcon from '@mui/icons-material/Apps';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import HomeIcon from '@mui/icons-material/Home';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MapIcon from '@mui/icons-material/Map';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ContactsIcon from '@mui/icons-material/Contacts';
import LayersIcon from '@mui/icons-material/Layers';

import { useNavigate } from 'react-router-dom'
import { useLocation } from "react-router-dom";


const Topbar = () => {

  const navigation = useNavigate()
  let location = useLocation()

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElApps, setAnchorElApps] = useState(null);


  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenAppsMenu = (event) => {
    setAnchorElApps(event.currentTarget);
  };

  const handleCloseAppsMenu = () => {
    setAnchorElApps(null);
  };


  return (
    <Box display="flex" justifyContent="space-between" p={2} sx={{ marginBottom: '15px' }} >
      {/* SEARCH BAR */}

      <DrawerNotification state={state} toggleDrawer={toggleDrawer} />

      <Box
        display="flex"
        backgroundColor={colors.primary[500]}
        alignItems='center'
        borderRadius="3px"
        gap='10px'
      >
        {location.pathname === '/map' && (
          <>
            <LayersIcon sx={{ fontSize: '36px' }} />
            <Typography sx={{ fontSize: '22px' }}>
              Sistema De Información Geográfica 
              <span style={{ color: colors.greenAccent[400], fontSize: '26px', fontWeight: 'bold' }}>
                { ' ' } Cuautitlan Izcalli
              </span>
            </Typography>
          </>
        )}

      </Box>

      {/* ICONS */}
      <Box display="flex" gap='7px'>

        <IconButton sx={{ width: '50px', height: '50px' }} onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <LightModeOutlinedIcon />
          ) : (
            <DarkModeOutlinedIcon />
          )}
        </IconButton>


        <IconButton onClick={handleOpenAppsMenu} sx={{ width: '50px', height: '50px' }} >
          <AppsIcon />
        </IconButton>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElApps}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElApps)}
          onClose={handleCloseAppsMenu}
        >
          <Box
            sx={{ width: '250px' }}
            display='flex'
            justifyContent='space-evenly'
            alignItems='center'
            flexWrap='wrap'
            gap='10px'
            padding='10px'
          >


            <Box sx={{ padding: '5px', borderRadius: '10px' }}>
              <IconButton sx={{ backgroundColor: colors.blueAccent[700] }} onClick={() => navigation('/')} >
                <HomeIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Box>

            <Box sx={{ padding: '5px', borderRadius: '10px' }}>
              <IconButton sx={{ backgroundColor: colors.blueAccent[700] }} onClick={() => navigation('/map-list')} >
                <MapIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Box>

            <Box sx={{ padding: '5px', borderRadius: '50%' }}>
              <IconButton sx={{ backgroundColor: colors.blueAccent[700] }}>
                <CalendarMonthIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Box>

            <Box sx={{ padding: '5px', borderRadius: '50%' }}>
              <IconButton sx={{ backgroundColor: colors.blueAccent[700] }}>
                <WhatsAppIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Box>

            <Box sx={{ padding: '5px', borderRadius: '50%' }}>
              <IconButton sx={{ backgroundColor: colors.blueAccent[700] }}>
                <ContactsIcon sx={{ fontSize: '30px' }} />
              </IconButton>
            </Box>

          </Box>
        </Menu>

        {/* ----------------------------------------- /// */}

        <IconButton sx={{ width: '50px', height: '50px' }} onClick={toggleDrawer('right', true)} >
          <NotificationsOutlinedIcon />
        </IconButton>

        {/* ----------------------------------------- /// */}

        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Foto usuario" src="avatar.jpg" sx={{ width: '50px', height: '50px' }} />
        </IconButton>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem sx={{ width: '175px' }} key={1} onClick={handleCloseUserMenu}>
            <PersonIcon sx={{ marginRight: '10px', color: '#00ff00' }} />
            <Typography textAlign="center">Perfil</Typography>
          </MenuItem>
          <MenuItem key={1} onClick={handleCloseUserMenu}>
            <SettingsIcon sx={{ marginRight: '10px', color: '#00ff00' }} />
            <Typography textAlign="center">Settings</Typography>
          </MenuItem>
          <MenuItem key={1} onClick={handleCloseUserMenu}>
            <LogoutIcon sx={{ marginRight: '10px', color: '#ff0000' }} />
            <Typography textAlign="center">Logout</Typography>
          </MenuItem>
        </Menu>


      </Box>
    </Box>
  );
};

export default Topbar;
