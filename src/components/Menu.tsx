"use client";

import { Box, Container, Typography, Grid } from "@mui/material";
import { menuItems } from "@/lib/data";
import MenuCard from "./MenuCard";

export default function Menu() {
    return (
        <Box component="section" id="menu" sx={{ py: 10 }}>
            <Container maxWidth="lg">
                <Typography variant="h2" sx={{ textAlign: "center", mb: 8, fontSize: { xs: "2rem", md: "2.5rem" } }}>
                    Our{" "}
                    <Box component="span" sx={{ color: "primary.main" }}>
                        Menu
                    </Box>
                </Typography>

                <Grid container spacing={4}>
                    {menuItems.map((item, index) => (
                        <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
                            <MenuCard item={item} index={index} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
