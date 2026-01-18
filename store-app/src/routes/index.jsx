import {createBrowserRouter} from "react-router";
import HomePage from "../pages/Home.jsx";
import ProductsPage from "../pages/Products.jsx";
import ProductDetailsPage from "../pages/ProductDetails.jsx";
import CartPage from "../pages/cart/Cart.jsx";
import LoginPage from "../pages/account/Login.jsx";
import RegisterPage from "../pages/account/Register.jsx";
import ErrorPage from "../pages/error/Error.jsx";
import ServerErrorPage from "../pages/error/ServerError.jsx";
import NotFound from "../pages/error/NotFound.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import AuthGuard from "../auth/AuthGuard.jsx";
import CheckoutPage from "../pages/checkout/Checkout.jsx";
import Orders from "../pages/orders/Order.jsx";
import OrdersPage from "../pages/orders/Order.jsx";

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
                element: <AuthGuard/>,
                children: [
                    {path: "checkout", element: <CheckoutPage/>},
                    {path: "orders", element: <OrdersPage/>}
                ]
            },

            {
                path: "errors",
                children: [
                    {index: true, element: <ErrorPage/>},
                    {path: "not-found", element: <NotFound/>},
                    {path: "server-error", element: <ServerErrorPage/>},
                ]
            },
            {path: "*", element: <NotFound/>}
        ]
    }
])