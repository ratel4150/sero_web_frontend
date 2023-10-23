import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const SelectFormControl = ({ data, itemSeleccionado, handleChange }) => {



    return (
        <>
            <FormControl fullWidth sx={{ marginBottom: '10px', color: '#ffffff' }}>
                <InputLabel id="demo-simple-select-label">SELECCIONA EL TEMPLATE</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={0}
                    label="Campaña electoral"
                    onChange={handleChange}
                >
                    <MenuItem value={0}> --- SELECCIONA EL TEMPLATE --- </MenuItem>
                    {/* {data && data.map(t => (
                        <MenuItem key={data.id_campana} value={t.id_campana}> {t.nombre_campana} </MenuItem>
                    ))} */}
                </Select>
            </FormControl>
        </>
    )
}

export default SelectFormControl
