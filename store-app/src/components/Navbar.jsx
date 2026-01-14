import {AppBar, Badge, Box, Button, IconButton, Toolbar} from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {NavLink, Link} from "react-router";
import {useSelector} from "react-redux";

const links = [
    {title: "Home", to: "/" },
    {title: "Products", to: "/products" },
];

const authLinks = [
    {title: "Login", to: "/login" },
    {title: "Register", to: "/register" }
]

export default function Navbar() {

    const {cart} = useSelector(state => state.cartStore)
    const totalItems = cart?.cartItems.reduce((total, item) => total + item.product.quantity, 0);
    return (
        <AppBar position="static" sx={{backgroundColor: "secondary.light"}}>
            <Toolbar>
                <Box sx={{display: "flex", alignItems: "center", flexGrow: 1}}>
                    <IconButton color="inherit">
                        <StorefrontIcon />
                    </IconButton>
                    {links.map(link => (
                        <Button component={NavLink} to={link.to} color="inherit" key={link.title}>
                            {link.title}
                        </Button>
                    ))}
                </Box>
                <Box sx={{display: "flex", alignItems: "center"}}>
                    <IconButton color="inherit" component={Link} to="/cart">
                        <Badge badgeContent={totalItems} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                    {authLinks.map(link => (
                        <Button component={NavLink} to={link.to} color="inherit" key={link.title}>
                            {link.title}
                        </Button>
                    ))}
                </Box>
            </Toolbar>
        </AppBar>
    )
}