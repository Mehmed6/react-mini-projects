import './App.css'
import {RouterProvider} from "react-router";
import {router} from "./routes/index.jsx";
import {useEffect} from "react";
import requests from "./api/apiClient.js";
import {useCartContext} from "./context/CartContext.jsx";

function App() {

    const {setCart} = useCartContext();

    useEffect(() => {
        requests.cart.get()
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
    }, []);

  return <RouterProvider router={router}/>
}

export default App
