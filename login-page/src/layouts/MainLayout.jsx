import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";

export default function MainLayout() {



    return (
        <>
            <ToastContainer  autoClose={2000} />
            //... you can add a header or navigation here if needed
            <Outlet/>

            //... you can add a footer here if needed

        </>

    )
}