import {useEffect, useState} from "react";
import ProductList from "../components/ProductList.jsx";
import Loading from "../components/Loading.jsx";
import {useDispatch, useSelector} from "react-redux";
import {fetchProducts, selectAllProducts} from "./catalog/catalogSlice.js";

export default function ProductsPage() {

    const {status, isLoaded} = useSelector(state => state.catalogStore)
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);

    useEffect(() => {
        if (!isLoaded) dispatch(fetchProducts());
    }, [dispatch, isLoaded]);

    if (status === "pendingFetchProducts") return <Loading/>;

    return <ProductList products={products} />;
}