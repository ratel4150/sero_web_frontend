import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, isSmall = false, image = false, src = '' }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 20px" >

      <Box display="flex" justifyContent="space-between" alignItems="center">

        <Box>
          <Typography
            variant={isSmall ? 'h6' : 'h5'}
            fontWeight="bold"
            sx={{ color: colors.grey[200] }}
          >
            {title}
          </Typography>
        </Box>


        {image ? (
          <Box sx={{ padding: '6px', borderRadius: '5px' }}>
            <img src={src} alt={`logo${src}`}
              style={{
                width:'80px',
                height:'115px',
                position: 'relative',
                top: '-22px',
                left: '15px'
              }}
            />
          </Box>
        ) : (
          <Box sx={{ background: colors.greenAccent[600], padding: '6px', borderRadius: '5px' }}>
            {icon}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          position: image
            ? 'relative'
            : null
          ,
          top: image
            ? '-40px'
            : null
        }}
      >
        <Typography variant="h4" sx={{ color: colors.greenAccent[400] }}>
          {subtitle}
        </Typography>
      </Box>


    </Box>
  );
};

export default StatBox;
