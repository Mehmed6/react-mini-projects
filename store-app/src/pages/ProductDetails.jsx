import {useParams} from "react-router";
import {useEffect, useState} from "react";
import ProductItem from "../components/ProductItem.jsx";
import Loading from "../components/Loading.jsx";
import requests from "../api/apiClient.js";
import {useCartContext} from "../context/CartContext.jsx";

export default function ProductDetailsPage() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const {cart, setCart} = useCartContext();

    const cartItem = cart?.cartItems.find(item => item.product.productId === product?.id);

    function handleAddItem(productId) {
        setIsAdding(true);

        requests.cart.addItem(productId)
            .then(cart => setCart(cart))
            .catch(err => console.log(err))
            .finally(() => setIsAdding(false));
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await requests.products.details(id)
                setProduct(response);

            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id]);

    if (loading) return <Loading/>;

    if (!product) return <p>Product not found.</p>;

    return <ProductItem
        product={product}
        handleAddItem={handleAddItem}
        cartItem={cartItem}
        isAdding={isAdding}
    />;
}