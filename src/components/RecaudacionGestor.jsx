import React from 'react'
import { Box, useTheme, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FaceIcon from '@mui/icons-material/Face';
import {  tokens } from "../theme";
import { recaudadoGestor } from '../data/recaudado'


const RecaudacionGestor = ({size_grid}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleSeeUser = (id_usuario) => {

    }


    const columns = [
        {
            field: "photo",
            headerName: "Foto",
            headerAlign: "center",
            flex: .6,
            renderCell: ({ row: { photo } }) => {
                return (
                    <Box
                        width="40%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        borderRadius="4px"
                    >
                        <img style={{ width: '45px', height: '45px', borderRadius: '50%' }} src={photo} alt="foto usuario" />
                    </Box>
                );
            },
        },
        {
            field: "name",
            headerName: "Nombre",
            headerAlign: "center",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "recaudado",
            headerName: "Recaudado",
            headerAlign: "center",
            align: "center",
            cellClassName: "name-column--cell",
        },
        {
            field: "datos",
            headerName: "Datos",
            headerAlign: "center",
            renderCell: ({ row: { id_usuario } }) => {
                return (
                    <Box
                        width="30%"
                        m="0 auto"
                    >
                        <IconButton aria-label="perfil" onClick={() => handleSeeUser(id_usuario)}>
                            <FaceIcon />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];


    return (
        <Box
            backgroundColor={colors.primary[400]}
            gridColumn={`span ${size_grid}`}
            borderRadius='10px'
        >

            <Box sx={{ marginTop: '20px', backgroundColor: colors.primary[400] }}>
                <Typography
                    variant="h5"
                    color={colors.greenAccent[400]}
                    sx={{ paddingTop: '10px', paddingLeft: '30px' }}
                >
                    Recaudación por gestor
                </Typography>
            </Box>

            <Box
                m="20px 0 0 0"
                height="400px"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                        textAlign: "center"
                      },
                      "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        textAlign: "center !important"
                      },
                      "& .name-column--cell": {
                        color: colors.grey[200],
                        fontSize: "14px"
                      },
                      "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.primary[400],
                        borderBottomColor: colors.greenAccent[700],
                      },
                      "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                      },
                      "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.primary[400],
                      },
                      "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                      },
                      "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                      },
                }}
            >

                <DataGrid rows={recaudadoGestor} columns={columns} autoPageSize />
            </Box>

        </Box>
    )
}

export default RecaudacionGestor