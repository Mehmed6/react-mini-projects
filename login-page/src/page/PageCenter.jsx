import {Outlet} from "react-router";

export default function PageCenter() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <Outlet/>
        </div>
    )
}