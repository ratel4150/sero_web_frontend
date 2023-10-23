
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const SelectFormPregunta = ({ data, itemSeleccionado, handleChange }) => {


    return (
        <>
            <FormControl fullWidth sx={{color: '#ffffff', marginTop:'20px', position:'relative', zIndex:'100', border: '1px dotted #868dfb'}}>
                <InputLabel id="demo-simple-select-label">SELECCIONA LA PREGUNTA DE LA ENCUESTA</InputLabel>
                <Select
                    key={1}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={itemSeleccionado}
                    label="Campaña electoral"
                    onChange={handleChange}
                >
                    <MenuItem value={0}> --- SELECCIONA LA PREGUNTA --- </MenuItem>
                    {data && data.map(t => (
                        <MenuItem key={t.id_pregunta} value={t.id_pregunta}> {t.display_pregunta} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default SelectFormPregunta
