import {useEffect, useState} from "react";
import ProductList from "../components/ProductList.jsx";
import Loading from "../components/Loading.jsx";

export default function ProductsPage() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await fetch("http://localhost:5000/products/");
                setProducts(await result.json());

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