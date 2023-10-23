
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'

const SelectFormSemana = ({ data, itemSeleccionado, handleChange }) => {


    return (
        <>
            <FormControl sx={{color: '#ffffff', marginTop:'20px', marginLeft:'10px', position:'relative', zIndex:'100', width: '52%'}}>
                <InputLabel id="demo-simple-select-label">SELECCIONA UNA SEMANA PARA FILTRAR ( PIE CHART Y BAR CHART )</InputLabel>
                <Select
                    key={1}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={itemSeleccionado}
                    label="Campaña electoral"
                    onChange={handleChange}
                >
                    <MenuItem value={0}> --- SELECCIONA LA SEMANA --- </MenuItem>
                    {data && data.map(t => (
                        <MenuItem key={t.semana} value={t.semana}> {t.semana} </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default SelectFormSemana
