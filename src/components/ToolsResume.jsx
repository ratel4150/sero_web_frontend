import { Container, Grid } from "@mui/material";
import React from "react";
import Title from "../components/Title";
import { section6Content } from "../data/ToolsResume";
import ServiceCard from './ServiceCard'

const { title, ITEMS } = section6Content;


const ToolsResume = () => {
    // const theme = useTheme();
    // const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Container sx={{ mt: { xs: 10, md: 20, lg: 25 } }}>
           
            <Grid container spacing={3}>
                {ITEMS.map((item) => (
                    <Grid item xs={12} md={6} key={item.title}>
                        <ServiceCard {...item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default ToolsResume;
