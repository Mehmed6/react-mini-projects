import {useAuthContext} from "@/context/AuthContext.jsx";
import {Navigate, Outlet} from "react-router";

export default function ProtectedLayout() {
    const {user, loading} = useAuthContext();

    if (loading) return <h1>Loading...</h1>
    if (!user) return <Navigate to="/login"/>;

    return <Outlet/>;
}