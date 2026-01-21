import {Outlet} from "react-router";

export default function MainLayout() {
    return (
        <>
            //... you can add a header or navigation here if needed
            <Outlet/>
            //... you can add a footer here if needed
        </>

    )
}