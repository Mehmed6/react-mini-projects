import {createBrowserRouter} from "react-router";
import PageCenter from "@/page/PageCenter.jsx";
import {LoginPage} from "@/page/LoginPage.jsx";
import MainLayout from "@/layouts/MainLayout.jsx";

export const router = createBrowserRouter([
    {
        path:"/", element: <MainLayout />,
        children:[
            {element: <PageCenter />,
            children:[
                {path:"login", element:<LoginPage/>}
            ]}
        ]
    }
])