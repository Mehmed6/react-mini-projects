import {useEffect, useState} from "react";
import ProductList from "../components/ProductList.jsx";
import Loading from "../components/Loading.jsx";
import requests from "../api/apiClient.js";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await requests.products.list();
                setProducts(result);

            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) return <Loading/>;

    return <ProductList products={products} />;
}