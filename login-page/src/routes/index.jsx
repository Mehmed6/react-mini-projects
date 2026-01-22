import {createBrowserRouter} from "react-router-dom";
import PageCenter from "@/page/PageCenter.jsx";
import {LoginPage} from "@/page/LoginPage.jsx";
import MainLayout from "@/layouts/MainLayout.jsx";
import PublicLayout from "@/layouts/PublicLayout.jsx";
import ProtectedLayout from "@/layouts/ProtectedLayout.jsx";
import Home from "@/page/Home.jsx";

export const router = createBrowserRouter([
    {
        path:"/", element: <MainLayout />,
        children:[
            { element: <PublicLayout/>,
            children: [
                { element: <PageCenter />,
                    children:[
                        { path:"login", element:<LoginPage/>}
                    ]}
            ]},

            { element: <ProtectedLayout/>,
            children: [
                { index: true ,element: <Home/>},
                { path: "home" ,element: <Home/>}
            ]}

        ]
    }
])