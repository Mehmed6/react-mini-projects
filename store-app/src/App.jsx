import './App.css'
import {RouterProvider} from "react-router";
import {router} from "./routes/index.jsx";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getCart} from "./pages/cart/cartSlice.js";
import {getUser} from "./pages/account/accountSlice.js";
import Loading from "./components/Loading.jsx";
import {setAuthToken} from "./api/apiClient.js";

function App() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const initApp = async () => {
        await dispatch(getCart())
        await dispatch(getUser())
    }
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) setAuthToken(user.token)
        initApp().then(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;
  return <RouterProvider router={router}/>
}

export default App
