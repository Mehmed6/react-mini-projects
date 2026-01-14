import './App.css'
import {RouterProvider} from "react-router";
import {router} from "./routes/index.jsx";
import {useEffect} from "react";
import requests from "./api/apiClient.js";
import {useDispatch} from "react-redux";
import {setCart} from "./pages/cart/cartSlice.js";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        requests.cart.get()
            .then(cart => dispatch(setCart(cart)))
            .catch(err => console.log(err))
    }, [dispatch]);

  return <RouterProvider router={router}/>
}

export default App
