"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Container,
    Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { cartCount, toggleCart } = useCart();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AppBar
            position="fixed"
            elevation={scrolled ? 2 : 0}
            sx={{
                bgcolor: scrolled ? "rgba(23, 25, 35, 0.85)" : "transparent",
                backdropFilter: scrolled ? "blur(12px)" : "none",
                borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
                transition: "all 0.3s ease",
                py: scrolled ? 0.5 : 1,
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    <Typography
                        component={Link}
                        href="/"
                        variant="h5"
                        sx={{
                            textDecoration: "none",
                            color: "text.primary",
                            fontWeight: 700,
                            fontFamily: "var(--font-heading), 'Outfit', sans-serif",
                        }}
                    >
                        Grillz{" "}
                        <Box component="span" sx={{ color: "primary.main" }}>
                            $
                        </Box>{" "}
                        Bunz
                    </Typography>

                    <IconButton
                        onClick={toggleCart}
                        sx={{
                            color: "text.primary",
                            "&:hover": { color: "primary.main" },
                        }}
                    >
                        <Badge
                            badgeContent={cartCount}
                            color="primary"
                            sx={{
                                "& .MuiBadge-badge": {
                                    fontWeight: 700,
                                    fontSize: "0.7rem",
                                },
                            }}
                        >
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
