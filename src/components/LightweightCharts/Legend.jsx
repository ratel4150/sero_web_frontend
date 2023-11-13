import { useEffect, useRef } from 'react'
import { createChart, ColorType } from 'lightweight-charts'
import { useTheme, Typography, Box, ButtonGroup, Button } from '@mui/material'
import { tokens } from '../../theme'


const initialData = [
    { time: '2019-12-01', value: 32.51 },
    { time: '2019-12-02', value: 33.31 },
    { time: '2019-12-03', value: 34.21 },
    { time: '2019-12-04', value: 35.31 },
    { time: '2019-12-05', value: 32.21 },
    { time: '2019-12-06', value: 33.51 },
    { time: '2019-12-07', value: 34.61 },
    { time: '2019-12-08', value: 35.21 },
    { time: '2019-12-09', value: 32.31 },
    { time: '2019-12-10', value: 34.41 },
    { time: '2019-12-11', value: 33.71 },
    { time: '2019-12-12', value: 34.11 },
    { time: '2019-12-13', value: 35.21 },
    { time: '2019-12-14', value: 32.31 },
    { time: '2019-12-15', value: 32.21 },
    { time: '2019-12-16', value: 32.31 },
    { time: '2019-12-17', value: 31.41 },
    { time: '2019-12-18', value: 32.51 },
    { time: '2019-12-19', value: 30.51 },
    { time: '2019-12-20', value: 32.51 },
    { time: '2019-12-21', value: 31.51 },
    { time: '2019-12-22', value: 32.51 },
    { time: '2019-12-23', value: 31.11 },
    { time: '2019-12-24', value: 37.02 },
    { time: '2019-12-25', value: 27.32 },
    { time: '2019-12-26', value: 35.17 },
    { time: '2019-12-27', value: 28.89 },
    { time: '2019-12-28', value: 35.46 },
    { time: '2019-12-29', value: 23.92 },
    { time: '2019-12-30', value: 32.68 },
    { time: '2019-12-31', value: 32.67 },
];

const Legend = ({ title, data, fecha_inicio, fecha_fin }) => {

    const theme = useTheme();
    const color = tokens(theme.palette.mode);
    const chartContainerRef = useRef();

    const colors = {
        backgroundColor: color.primary[400],
        lineColor: color.greenAccent[400],
        textColor: color.grey[500],
        areaTopColor: '#071d54',
        areaBottomColor: 'rgba(14, 30, 76, 0.19)',
    }

    useEffect(() => {
        const handleResize = () => {
            chart.applyOptions({
                width: chartContainerRef.current.clientWidth,
            });
        };

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: colors.backgroundColor },
                textColor: colors.textColor, 
            },
            grid: {
                vertLines: false,
                horzLines: false
            },

            width: chartContainerRef.current.clientWidth,
            height: 300,
        });
        chart.timeScale().fitContent();

        const newSeries = chart.addAreaSeries({ lineColor: colors.lineColor, topColor: colors.areaTopColor, bottomColor: colors.areaBottomColor });
        newSeries.setData(initialData);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);

            chart.remove();
        };
    }, [initialData, colors.backgroundColor, colors.lineColor, colors.textColor, colors.areaTopColor, colors.areaBottomColor]);



    return (
        <Box
            sx={{ backgroundColor: color.primary[400], borderRadius: '10px' }}
        >
            <Typography
                sx={{ padding: '10px 10px 0 10px', fontSize: '20px', color: color.grey[200] }}
            >{title}</Typography>

            <Box sx={{ padding: '10px 10px 0 10px' }}>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button sx={{ backgroundColor: color.greenAccent[600] }}>Mes</Button>
                    <Button sx={{ backgroundColor: color.greenAccent[600] }}>Semana</Button>
                    <Button sx={{ backgroundColor: color.greenAccent[600] }}>Día</Button>
                </ButtonGroup>
            </Box>
            <div
                ref={chartContainerRef}
            />
        </Box>
    )
}

export default Legend