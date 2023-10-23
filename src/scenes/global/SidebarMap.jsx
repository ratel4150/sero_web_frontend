import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme, Tooltip, Card, CardHeader, CardContent, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";


import { tokens } from "../../theme";

import PublicIcon from '@mui/icons-material/Public';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";




const Item = ({ title, to, icon, selected, setSelected, color, isCollapsed = false }) => {

    const theme = useTheme();

    return (
        <>
            {isCollapsed ? (
                <Tooltip title={title} placement="right" arrow={true} >
                    <MenuItem
                        active={selected === title}
                        style={{
                            color: color
                        }}
                        onClick={() => setSelected(title)}
                        icon={icon}
                    >
                        <Typography>{title}</Typography>
                        <Link to={to} />
                    </MenuItem>
                </Tooltip>
            ) : (
                <MenuItem
                    active={selected === title}
                    style={{
                        color: color
                    }}
                    onClick={() => setSelected(title)}
                    icon={icon}
                >
                    <Typography>{title}</Typography>
                    <Link to={to} />
                </MenuItem>
            )}
        </>


    );
};



const Sidebar = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [user, setUser] = useState(null)

    useEffect(() => {
        screen.width <= 450 ? setIsCollapsed(true) : setIsCollapsed(false)
        const user_res = localStorage.getItem('user');
        const user = JSON.parse(user_res)
        //console.log(user);
        if (user) { 
            setUser(user)
        }
    }, [])


    const handleCerrarSesion = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.primary[400]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#a4a9fc !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6EBE71 !important",
                },
                "height": "100%"
            }}
        >


            <ProSidebar collapsed={isCollapsed} >
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.grey[100],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <img src={theme.palette.mode === "dark" ? "sero_claro.png" : "sero-logo.png"} style={{ width: '150px' }} alt="" />
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                                    <MenuOutlinedIcon />
                                </IconButton>
                            </Box>
                        )}
                    </MenuItem>

                    <Box paddingLeft={isCollapsed ? undefined : "10%"}>

                        {!isCollapsed && (
                            <Box>
                                <Card sx={{ width: '90%', marginBottom: '15px' }}>
                                    <CardHeader sx={{ backgroundColor: colors.primary[500], height: '30px' }}
                                        title='Servicios'
                                    />
                                    <CardContent sx={{ backgroundColor: colors.grey[1000] }} >
                                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', borderRadius: '10px' }} >
                                            <IconButton aria-label="delete" size="large">
                                                <PublicIcon sx={{ color: colors.primary[500] }} fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large">
                                                <PublicIcon sx={{ color: colors.primary[500] }} fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large">
                                                <PublicIcon sx={{ color: colors.primary[500] }} fontSize="inherit" />
                                            </IconButton>
                                            <IconButton aria-label="delete" size="large">
                                                <PublicIcon sx={{ color: colors.primary[500] }} fontSize="inherit" />
                                            </IconButton>
                                        </Box>
                                        <Alert severity="success" color="info" variant="outline" sx={{
                                            height: '36px', marginTop: '5px', borderRadius: '7px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
                                            backgroundColor: colors.greenAccent[500]
                                        }}>
                                            Cartografía
                                        </Alert>
                                    </CardContent>
                                </Card>

                                <Card sx={{ width: '90%', marginBottom: '15px' }}>
                                    <CardHeader sx={{ backgroundColor: colors.primary[500], height: '30px' }}
                                        title='Layers'
                                    />
                                    <CardContent
                                        sx={{ backgroundColor: colors.grey[1000] }} >
                                        <Button sx={{ width: '100%', backgroundColor: colors.grey[100], marginBottom: '2px' }} >Secondary</Button>
                                        <Button sx={{ width: '100%', backgroundColor: colors.grey[100], marginBottom: '2px' }} >Secondary</Button>
                                        <Button sx={{ width: '100%', backgroundColor: colors.grey[100], marginBottom: '2px' }} >Secondary</Button>
                                    </CardContent>
                                </Card>

                                <Card sx={{ width: '90%' }}>
                                    <CardHeader sx={{ backgroundColor: colors.primary[500], height: '30px' }}
                                        title='Información'
                                    />
                                    <CardContent
                                        sx={{ backgroundColor: colors.grey[1000] }} >
                                        <Button sx={{ width: '100%' }} color="primary">Secondary</Button>
                                        <Button sx={{ width: '100%' }} color="primary">Secondary</Button>
                                        <Button sx={{ width: '100%' }} color="primary">Secondary</Button>
                                    </CardContent>
                                </Card>

                            </Box>
                        )}

                    </Box>
                </Menu>
            </ProSidebar>
        </Box >
    );
};

export default Sidebar;
