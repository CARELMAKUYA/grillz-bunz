"use client";

import { useEffect, useRef, useState } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    Button,
    TextField,
    Divider,
    Alert,
    Stack,
    ButtonGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useCart } from "@/context/CartContext";
import emailjs from "@emailjs/browser";

// Replace these with your actual IDs or move to .env
const SERVICE_ID = "YOUR_SERVICE_ID";
const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function CartDrawer() {
    const {
        cart,
        removeFromCart,
        updateQty,
        isCartOpen,
        toggleCart,
        cartTotal,
        clearCart,
    } = useCart();

    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (!isCartOpen) {
            setIsCheckingOut(false);
            setSubmitStatus("idle");
        }
    }, [isCartOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsLoading(true);

        const formData = new FormData(formRef.current);
        const orderDetails = cart
            .map((item) => `- ${item.qty}x ${item.name} (R${item.price})`)
            .join("\n");

        const templateParams = {
            customer_name: formData.get("name"),
            customer_phone: formData.get("phone"),
            customer_address: formData.get("address"),
            customer_notes: formData.get("notes"),
            order_details: orderDetails,
            order_total: `R ${cartTotal.toFixed(2)}`,
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setSubmitStatus("success");
            clearCart();
            setTimeout(toggleCart, 3000);
        } catch (error) {
            console.error("EmailJS Error:", error);
            const mailtoLink = `mailto:mncmakuya12@gmail.com?subject=New Order from ${formData.get("name")}&body=${encodeURIComponent(
                `Name: ${formData.get("name")}\nPhone: ${formData.get("phone")}\nAddress: ${formData.get("address")}\nNotes: ${formData.get("notes")}\n\nOrder:\n${orderDetails}\n\nTotal: R ${cartTotal.toFixed(2)}`
            )}`;
            window.location.href = mailtoLink;
            setSubmitStatus("success");
            clearCart();
            setTimeout(toggleCart, 1000);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Drawer
            anchor="right"
            open={isCartOpen}
            onClose={toggleCart}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 420 },
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                }}
            >
                <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: "var(--font-heading), 'Outfit', sans-serif" }}>
                    Your Order
                </Typography>
                <IconButton onClick={toggleCart} size="small" sx={{ color: "text.secondary" }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ flexGrow: 1, overflowY: "auto", p: 3 }}>
                {cart.length === 0 ? (
                    /* ─── Empty State ─── */
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2,
                        }}
                    >
                        <ShoppingBagOutlinedIcon sx={{ fontSize: 64, opacity: 0.15, color: "text.secondary" }} />
                        <Typography color="text.secondary">Your cart is empty.</Typography>
                        <Button onClick={toggleCart} color="primary" size="small">
                            Browse Menu
                        </Button>
                    </Box>
                ) : isCheckingOut ? (
                    /* ─── Checkout Form ─── */
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <Stack spacing={2.5}>
                            <TextField
                                name="name"
                                label="Full Name"
                                required
                                placeholder="John Doe"
                                fullWidth
                                size="small"
                            />
                            <TextField
                                name="phone"
                                label="Phone Number"
                                type="tel"
                                required
                                placeholder="012 345 6789"
                                fullWidth
                                size="small"
                            />
                            <TextField
                                name="address"
                                label="Delivery Address"
                                required
                                placeholder="Street, Suburb, City"
                                fullWidth
                                multiline
                                rows={3}
                                size="small"
                            />
                            <TextField
                                name="notes"
                                label="Notes (Optional)"
                                placeholder="Extra sauce, specific instructions..."
                                fullWidth
                                multiline
                                rows={2}
                                size="small"
                            />

                            {/* Order Summary */}
                            <Box
                                sx={{
                                    bgcolor: "rgba(255,255,255,0.03)",
                                    borderRadius: 2,
                                    p: 2,
                                    mt: 1,
                                }}
                            >
                                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Items ({cart.length})
                                    </Typography>
                                    <Typography variant="body2">R {cartTotal.toFixed(2)}</Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        Total
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 700 }}>
                                        R {cartTotal.toFixed(2)}
                                    </Typography>
                                </Box>
                            </Box>
                        </Stack>
                    </form>
                ) : (
                    /* ─── Cart Items ─── */
                    <Stack spacing={2.5}>
                        {cart.map((item) => (
                            <Box key={item.id} sx={{ display: "flex", gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 72,
                                        height: 72,
                                        borderRadius: 2,
                                        overflow: "hidden",
                                        flexShrink: 0,
                                    }}
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </Box>
                                <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="primary" sx={{ fontWeight: 600 }}>
                                            R {item.price}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                        <ButtonGroup size="small" variant="outlined" sx={{ "& .MuiButton-root": { minWidth: 28, px: 0, borderColor: "divider" } }}>
                                            <Button onClick={() => updateQty(item.id, -1)}>
                                                <RemoveIcon sx={{ fontSize: 14 }} />
                                            </Button>
                                            <Button disabled sx={{ color: "text.primary !important", fontWeight: 700 }}>
                                                {item.qty}
                                            </Button>
                                            <Button onClick={() => updateQty(item.id, 1)}>
                                                <AddIcon sx={{ fontSize: 14 }} />
                                            </Button>
                                        </ButtonGroup>
                                        <IconButton
                                            size="small"
                                            onClick={() => removeFromCart(item.id)}
                                            sx={{ color: "text.secondary", "&:hover": { color: "error.main" } }}
                                        >
                                            <DeleteOutlineIcon sx={{ fontSize: 18 }} />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                )}
            </Box>

            {/* Footer Actions */}
            {cart.length > 0 && (
                <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "divider" }}>
                    {!isCheckingOut ? (
                        <>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                                <Typography color="text.secondary">Total</Typography>
                                <Typography
                                    variant="h5"
                                    color="primary"
                                    sx={{ fontWeight: 700, fontFamily: "var(--font-heading), 'Outfit', sans-serif" }}
                                >
                                    R {cartTotal.toFixed(2)}
                                </Typography>
                            </Box>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                size="large"
                                onClick={() => setIsCheckingOut(true)}
                            >
                                Checkout
                            </Button>
                        </>
                    ) : (
                        <Stack spacing={1.5}>
                            {submitStatus === "success" ? (
                                <Alert severity="success" variant="outlined" sx={{ justifyContent: "center", fontWeight: 700 }}>
                                    Order Sent Successfully!
                                </Alert>
                            ) : (
                                <>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        onClick={handleSubmit}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Sending..." : "Place Order"}
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="text"
                                        color="inherit"
                                        onClick={() => setIsCheckingOut(false)}
                                        disabled={isLoading}
                                        sx={{ color: "text.secondary" }}
                                    >
                                        Back to Cart
                                    </Button>
                                </>
                            )}
                        </Stack>
                    )}
                </Box>
            )}
        </Drawer>
    );
}
