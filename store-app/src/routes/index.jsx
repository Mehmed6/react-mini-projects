import {createBrowserRouter} from "react-router";
import MainLayout from "../layouts/MainLayout.jsx";
import HomePage from "../pages/Home.jsx";
import ProductsPage from "../pages/Products.jsx";
import ProductDetailsPage from "../pages/ProductDetails.jsx";
import CartPage from "../pages/cart/Cart.jsx";
import LoginPage from "../pages/Login.jsx";
import RegisterPage from "../pages/Register.jsx";
import ErrorPage from "../pages/error/Error.jsx";
import ServerErrorPage from "../pages/error/ServerError.jsx";
import NotFound from "../pages/error/NotFound.jsx";

export const router = createBrowserRouter([
    {
        path: "/", element: <MainLayout/>,
        children:[
            {index: true, element: <HomePage/>},
            {path: "home", element: <HomePage/>},
            {
                path: "products",
                children: [
                    {index: true, element: <ProductsPage/>},
                    {path: ":id", element: <ProductDetailsPage/>}
                ]
            },
            {path: "cart", element: <CartPage/>},
            {path: "login", element: <LoginPage/>},
            {path: "register", element: <RegisterPage/>},
            {
                path: "errors",
                children: [
                    {index: true, element: <ErrorPage/>},
                    {path: "not-found", element: <NotFound/>},
                    {path: "server-error", element: <ServerErrorPage/>},
                ]
            }
        ]
    }
])