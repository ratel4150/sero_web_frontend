
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const SelectFormControl = ({ data, itemSeleccionado, handleChange }) => {

    return (
        <>
            <FormControl fullWidth sx={{marginTop: '-5px',  marginBottom: '20px', color: '#ffffff', border: '1px dotted #868dfb' }}>
                <InputLabel id="demo-simple-select-label">SELECCIONA LA CAMPAÑA</InputLabel>
                <Select
                    key={1}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={itemSeleccionado}
                    label="Campaña electoral"
                    onChange={handleChange}
                >
                    <MenuItem value={0}> --- SELECCIONA LA CAMPAÑA --- </MenuItem>
                    {data && data.map(t => (
                        <MenuItem key={Math.floor(Math.random() * 100)} value={t.id_campana}> {t.nombre_campana} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default SelectFormControl









// import React from 'react'
// import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

// const SelectFormControl = ({itemSeleccionado, handleChange}) => {

//     // recibir la data que se mostrara en el select

//     return (
//         <FormControl fullWidth sx={{ marginBottom: '10px', color: '#ffffff' }}>
//             <InputLabel id="demo-simple-select-label">SELECCIONA LA CAMPAÑA</InputLabel>
//             <Select
//                 labelId="demo-simple-select-label"
//                 id="demo-simple-select"
//                 value={itemSeleccionado}
//                 label="Campaña electoral"
//                 onChange={handleChange}
//             >
//                 <MenuItem value={0}> --- SELECCIONA LA CAMPAÑA --- </MenuItem>
//                 <MenuItem value={13}>ADRIÁN JÚAREZ - PRESIDENTE MUNICIPAL TLALNEPANTLA ESTADO DE MÉXICO</MenuItem>
//                 <MenuItem value={14}>CUAUTITLÁN IZCALLI</MenuItem>
//                 <MenuItem value={15}>NAUCALPAN</MenuItem>
//             </Select>
//         </FormControl>
//     )
// }

// export default SelectFormControl