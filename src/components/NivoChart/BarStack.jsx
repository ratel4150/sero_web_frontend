
import { Bar, ResponsiveBar } from '@nivo/bar'
import { useTheme } from '@mui/material'
import { tokens } from '../../theme'

const BarStack = ({ data, position, color, keys, groupMode }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (

        <ResponsiveBar
            data={data}
            keys={keys}
            indexBy="usuario"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: `${color}` }}
            enableGridY={false}
            layout={position}
            groupMode={`${groupMode ? "grouped" : ""}`}
            tooltip={d => {
                return (
                    <div style={{ width: '270px', padding: '5px 20px', backgroundColor: '#fffafa', borderRadius: '10px', color: '#000000', textAlign: 'center' }}>
                        <div style={{ width: '10px', height: '10px', marginRight: '10px', backgroundColor: d.color, display: 'inline-block' }}></div>
                        <h4 style={{ display: 'inline-block', fontWeight: 'bold' }}>
                            {d.indexValue.replaceAll('_', ' ')} - {d.formattedValue}
                        </h4>
                    </div>
                )
            }}
            theme={{
                // added
                axis: {
                    domain: {
                        line: {
                            stroke: colors.grey[100],
                        },
                    },
                    legend: {
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                    ticks: {
                        line: {
                            stroke: colors.grey[100],
                            strokeWidth: 1,
                        },
                        text: {
                            fill: colors.grey[100],
                        },
                    },
                },
                legends: {
                    text: {
                        fill: colors.grey[100],
                    },
                }
            }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    itemTextColor: 'white',
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e => e.id + ": " + e.formattedValue + " in usuario: " + e.indexValue}
        />
    )
}

export default BarStack