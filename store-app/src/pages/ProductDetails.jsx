import {useParams} from "react-router";
import {useEffect, useState} from "react";
import ProductItem from "../components/ProductItem.jsx";
import Loading from "../components/Loading.jsx";

export default function ProductDetailsPage() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch("http://localhost:5000/products/" + id);
                setProduct(await response.json());

            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <Loading/>;

    return <ProductItem product={product}/>;
}