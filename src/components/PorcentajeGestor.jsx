import React from 'react'
import { Box, useTheme, Typography, Avatar, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { recaudadoGestor } from '../data/recaudado'


const PorcentajeGestor = ({ size_grid }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleSeeUser = (id_usuario) => {

    }

    const color_porcentaje_mayor = 'linear-gradient(to right bottom, #004789, #12FB0A)'
    const color_porcentaje_medio = 'linear-gradient(to right bottom, #004789, #3da58a)'
    const color_porcentaje_bajo = 'linear-gradient(to right bottom, #004789, #bd2308)'


    const columns = [
        {
            field: "name",
            headerName: "Nombre",
            flex: 1,
            headerAlign: "center",
            cellClassName: "name-column--cell",
        },
        {
            field: "porcentaje",
            headerName: "Porcentaje",
            headerAlign: "center",
            flex: 1,
            renderCell: ({ row: { photo, porcentaje } }) => {
                return (
                    <Box
                        width="90%"
                        m="0 auto"
                        display="flex"
                        justifyContent="center"
                        borderRadius="4px"
                    >
                        <Chip label={`${porcentaje}%`} avatar={<Avatar src={photo} />}
                            style={{ color: colors.grey[100], fontSize: '15px', width: (porcentaje * 4), height: '15px', background: porcentaje >= 40 ? color_porcentaje_mayor : (porcentaje < 40 && porcentaje >= 20 ? color_porcentaje_medio : color_porcentaje_bajo)}}>
                        </Chip>
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
                    Porcentaje por gestor
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

export default PorcentajeGestor