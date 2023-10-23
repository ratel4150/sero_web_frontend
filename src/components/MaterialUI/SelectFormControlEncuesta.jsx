
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const SelectFormControlEncuesta = ({ data, itemSeleccionado, handleChange }) => {

    return (
        <>
            <FormControl fullWidth sx={{ marginBottom: '10px', color: '#ffffff', border: '1px dotted #868dfb' }}>
                <InputLabel id="demo-simple-select-label">SELECCIONA LA ENCUESTA</InputLabel>
                <Select
                    key={1}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={itemSeleccionado}
                    label="Campaña electoral"
                    onChange={handleChange}
                >
                    <MenuItem value={0}> --- SELECCIONA LA ENCUESTA --- </MenuItem>
                    {data && data.map(t => (
                        <MenuItem key={Math.floor(Math.random() * 100)} value={t.id_encuesta}> {t.nombre_encuesta} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default SelectFormControlEncuesta

