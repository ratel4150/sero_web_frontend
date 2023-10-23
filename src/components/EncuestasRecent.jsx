import { Box, Typography } from "@mui/material";

const EncuestasRecent = ({encuestasRecientes}) => {
    return (
        <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Encuestas recientes
                </Typography>
            </Box>


            {encuestasRecientes.map((encuesta, i) => (
                <Box
                    key={i}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                >
                    <Box>
                        <Typography
                            color={colors.greenAccent[500]}
                            variant="h5"
                            fontWeight="600"
                        >
                            {encuesta.template}
                        </Typography>
                        <Typography color={colors.grey[100]}>
                            {encuesta.profile}
                        </Typography>
                    </Box>
                    <Box color={colors.grey[100]}>{encuesta.fecha}</Box>
                    <Box
                        backgroundColor={colors.greenAccent[500]}
                        p="5px 10px"
                        borderRadius="4px"
                    >
                        {encuesta.partido}
                    </Box>
                </Box>
            ))}
        </Box>
    )
}

export default EncuestasRecent