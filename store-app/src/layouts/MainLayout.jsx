import {Outlet, useNavigate} from 'react-router';
import Navbar from "../components/Navbar.jsx";
import {Container} from "@mui/material";
import {ToastContainer} from "react-toastify";
import {useEffect} from "react";
import {setOnHttpError} from "../api/apiClient.js";
export default function MainLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        setOnHttpError(({status, data}) =>{
            if (status === 404) navigate("/errors/not-found")
            if (status === 500) navigate("/errors/server-error", {
                state: {error: data, status}
            });

            return () => setOnHttpError(null);

        })
    }, [navigate]);

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