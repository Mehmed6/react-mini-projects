import {AppBar, Badge, Box, Button, IconButton, MenuItem, Toolbar, Menu} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {NavLink, Link, useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../pages/account/accountSlice.js";
import {useState} from "react";

const links = [
    {title: "Home", to: "/" },
    {title: "Products", to: "/products" },
];

const authLinks = [
    {title: "Login", to: "/login" },
    {title: "Register", to: "/register" }
]

export default function Navbar() {

    const dispatch = useDispatch();
    const {user} = useSelector(state => state.accountStore)
    const {cart} = useSelector(state => state.cartStore)
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const totalItems = cart?.cartItems.reduce((total, item) => total + item.product.quantity, 0);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
      setAnchorEl(null);
    }
    const handleLogout = async () => {
        handleClose()
        dispatch(logout());
        navigate("/login")
    }


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
                    {
                        user ? (
                            <>
                                <Button id="user-button"
                                        onClick={handleClick}
                                        endIcon={<KeyboardArrowDown/>}
                                        color="inherit"
                                >
                                    {user.username}
                                </Button>

                                <Menu
                                    id="user-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem component={Link} to="/orders">
                                        Order
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        Logout
                                    </MenuItem>

                                </Menu>
                            </>
                        ) : (
                            <>
                                {authLinks.map(link => (
                                    <Button component={NavLink} to={link.to} color="inherit" key={link.title}>
                                        {link.title}
                                    </Button>
                                ))}
                            </>
                        )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    )
}