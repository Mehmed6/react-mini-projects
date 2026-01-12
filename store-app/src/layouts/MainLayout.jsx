import {Outlet} from 'react-router';
import Navbar from "../components/Navbar.jsx";
export default function MainLayout() {
    return (
        <>
            <Navbar/>
            <Outlet />
        </>
    );
}