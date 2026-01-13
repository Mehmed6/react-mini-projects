import {Outlet} from 'react-router';
import Navbar from "../components/Navbar.jsx";
import {Container} from "@mui/material";
import {ToastContainer} from "react-toastify";
export default function MainLayout() {
    return (
        <>
            <ToastContainer position="bottom-right" />
            <Navbar/>
            <Container sx={{mt: 3}}>
                <Outlet />
            </Container>
        </>
    );
}