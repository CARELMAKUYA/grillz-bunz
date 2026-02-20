"use client";

import { Box, Container, Typography, Button, Chip } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                pt: 10,
            }}
        >
            {/* Radial gradient background */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    background:
                        "radial-gradient(ellipse at center, hsla(34,100%,55%,0.08), hsl(222,47%,11%) 70%)",
                }}
            />

            <Container maxWidth="md" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Chip
                        label="Now Open for Orders"
                        color="primary"
                        variant="outlined"
                        sx={{
                            mb: 4,
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            borderColor: "primary.main",
                            color: "primary.main",
                            bgcolor: "rgba(255,159,28,0.08)",
                        }}
                    />

                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "2.8rem", md: "4.5rem" },
                            lineHeight: 1.1,
                            mb: 3,
                        }}
                    >
                        Flame Grilled
                        <br />
                        <Box
                            component="span"
                            sx={{
                                background: "linear-gradient(90deg, hsl(34,100%,55%), hsl(25,100%,60%))",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Perfection
                        </Box>
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            color: "text.secondary",
                            fontWeight: 400,
                            maxWidth: 560,
                            mx: "auto",
                            mb: 5,
                            lineHeight: 1.6,
                            fontFamily: "var(--font-body), 'Inter', sans-serif",
                        }}
                    >
                        Ribs, Wings, Burgers & Traditional Pap Dishes.
                        <br />
                        The best flavors in town, delivered straight to your door.
                    </Typography>

                    <Button
                        component={Link}
                        href="#menu"
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{ px: 5, py: 1.5, fontSize: "1rem" }}
                    >
                        View Menu
                    </Button>
                </motion.div>
            </Container>

            {/* Bottom fade */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: 100,
                    background: "linear-gradient(to top, hsl(222,47%,11%), transparent)",
                    zIndex: 1,
                }}
            />
        </Box>
    );
}
