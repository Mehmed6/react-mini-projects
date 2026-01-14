import {useParams} from "react-router";
import {useEffect} from "react";
import ProductItem from "../components/ProductItem.jsx";
import Loading from "../components/Loading.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addItemToCart} from "./cart/cartSlice.js";
import {fetchProductById, selectProductById} from "./catalog/catalogSlice.js";

export default function ProductDetailsPage() {
    const {id} = useParams();
    const {cart, status} = useSelector(state => state.cartStore)
    const dispatch = useDispatch();
    const product = useSelector(state => selectProductById(state, id));
    const {status: loading} = useSelector(state => state.catalogStore)

    const cartItem = cart?.cartItems.find(item => item.product.productId === product?.id);

    function handleAddItem(productId) {
        dispatch(addItemToCart({productId: productId}))
    }

    useEffect(() => {
        if (!product && id) dispatch(fetchProductById(id))
    }, [dispatch, id, product]);

    if (loading === "pendingFetchProductById") return <Loading/>;

    if (!product) return <p>Product not found.</p>;

    return <ProductItem
        product={product}
        handleAddItem={handleAddItem}
        cartItem={cartItem}
        isAdding={status === "pendingAddItem" + product.id}
    />;
}