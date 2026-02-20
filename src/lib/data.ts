import { MenuItem } from "@/context/CartContext";

export const menuItems: MenuItem[] = [
    {
        id: 1,
        name: "BBQ Ribs",
        desc: "Succulent pork ribs basted in our secret sticky BBQ sauce. Served with golden chips.",
        price: 180,
        image: "/images/ribs&chips.png", // Note: Leading slash for public folder access in Next.js
        category: "Ribs",
    },
    {
        id: 2,
        name: "Buffalo Wings",
        desc: "6 crispy wings tossed in spicy buffalo or sticky BBQ sauce. Served with chips and ranch dip.",
        price: 95,
        image: "/images/wings&chips.png",
        category: "Wings",
    },
    {
        id: 3,
        name: "Gourmet Burger",
        desc: "200g pure beef patty, cheddar melt, caramelized onions, and house sauce. Served with chips.",
        price: 110,
        image: "/images/burger&chips.png",
        category: "Burgers",
    },
    {
        id: 4,
        name: "Steak & Pap",
        desc: "300g Rump steak grilled to perfection. Served with traditional pap and chakalaka/spinach.",
        price: 150,
        image: "/images/steak&pap.png",
        category: "Traditional",
    },
    {
        id: 5,
        name: "Wors & Pap",
        desc: "Traditional Boerewors spiral served with crumbly pap and tomato relish.",
        price: 85,
        image: "/images/wors&pap.png",
        category: "Traditional",
    },
    {
        id: 6,
        name: "Chicken & Pap",
        desc: "Quarter chicken (Leg & Thigh) grilled to perfection. Served with pap.",
        price: 90,
        image: "/images/chicken&pap.png",
        category: "Traditional",
    },
];
