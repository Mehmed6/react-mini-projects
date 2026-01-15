import {useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router";

export default function AuthGuard() {
    const {user} = useSelector(state => state.accountStore);
    const location = useLocation();

    if (!user) return <Navigate to="/login" state={{from:location}}/>;
    return <Outlet/>
}