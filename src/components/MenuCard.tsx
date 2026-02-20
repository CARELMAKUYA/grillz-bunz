"use client";

import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button,
    Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { MenuItem, useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

interface MenuCardProps {
    item: MenuItem;
    index: number;
}

export default function MenuCard({ item, index }: MenuCardProps) {
    const { addToCart } = useCart();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Card
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                }}
            >
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        height="200"
                        image={item.image}
                        alt={item.name}
                        sx={{
                            objectFit: "cover",
                            transition: "transform 0.5s ease",
                            "&:hover": { transform: "scale(1.08)" },
                        }}
                    />
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                        }}
                    />
                </Box>

                <CardContent sx={{ flexGrow: 1, pt: 2.5 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>
                            {item.name}
                        </Typography>
                        <Typography
                            variant="h6"
                            color="primary"
                            sx={{
                                fontWeight: 700,
                                fontSize: "1.1rem",
                                fontFamily: "var(--font-heading), 'Outfit', sans-serif",
                                whiteSpace: "nowrap",
                                ml: 1,
                            }}
                        >
                            R {item.price}
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                        {item.desc}
                    </Typography>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => addToCart(item)}
                        sx={{
                            borderColor: "rgba(255,255,255,0.1)",
                            color: "text.primary",
                            "&:hover": {
                                bgcolor: "primary.main",
                                color: "primary.contrastText",
                                borderColor: "primary.main",
                            },
                        }}
                    >
                        Add to Order
                    </Button>
                </CardActions>
            </Card>
        </motion.div>
    );
}
