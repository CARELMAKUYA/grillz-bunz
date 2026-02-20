import { Box, Container, Typography, Divider } from "@mui/material";

export default function Footer() {
    return (
        <Box component="footer" sx={{ py: 5, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                        &copy; {new Date().getFullYear()} Grillz $ Bunz. All rights reserved.
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "primary.main", fontWeight: 600, opacity: 0.85 }}
                    >
                        Developed by Makuvion Technologies
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}
