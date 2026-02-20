"use client";

import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "hsl(34, 100%, 55%)",      // Vibrant orange
            contrastText: "hsl(222, 47%, 11%)",
        },
        secondary: {
            main: "hsl(176, 61%, 47%)",       // Teal accent
            contrastText: "hsl(222, 47%, 11%)",
        },
        background: {
            default: "hsl(222, 47%, 11%)",    // Deep charcoal
            paper: "hsl(217, 32%, 17%)",      // Card background
        },
        text: {
            primary: "hsl(210, 40%, 98%)",
            secondary: "hsl(215, 20%, 65%)",
        },
        error: {
            main: "hsl(0, 62%, 50%)",
        },
        divider: "hsl(217, 32%, 22%)",
    },
    typography: {
        fontFamily: "var(--font-body), 'Inter', sans-serif",
        h1: { fontFamily: "var(--font-heading), 'Outfit', sans-serif", fontWeight: 800 },
        h2: { fontFamily: "var(--font-heading), 'Outfit', sans-serif", fontWeight: 700 },
        h3: { fontFamily: "var(--font-heading), 'Outfit', sans-serif", fontWeight: 700 },
        h4: { fontFamily: "var(--font-heading), 'Outfit', sans-serif", fontWeight: 700 },
        h5: { fontFamily: "var(--font-heading), 'Outfit', sans-serif", fontWeight: 600 },
        h6: { fontFamily: "var(--font-heading), 'Outfit', sans-serif", fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 600 },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 50,
                    padding: "10px 28px",
                },
                containedPrimary: {
                    boxShadow: "0 4px 14px 0 hsla(34, 100%, 55%, 0.25)",
                    "&:hover": {
                        boxShadow: "0 6px 20px 0 hsla(34, 100%, 55%, 0.35)",
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                    border: "1px solid hsla(0, 0%, 100%, 0.05)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        borderColor: "hsla(34, 100%, 55%, 0.3)",
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 30px hsla(34, 100%, 55%, 0.08)",
                    },
                },
            },
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundImage: "none",
                    borderLeft: "1px solid hsla(0, 0%, 100%, 0.1)",
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundImage: "none",
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                            borderColor: "hsl(34, 100%, 55%)",
                        },
                    },
                },
            },
        },
    },
});

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
}
