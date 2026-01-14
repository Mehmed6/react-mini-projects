import {createAsyncThunk, createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import requests from "../../api/apiClient.js";

const productsAdapter = createEntityAdapter();
const initialState = productsAdapter.getInitialState({
    status: "idle",
    isLoaded: false,
})

export const fetchProducts = createAsyncThunk(
    "catalog/fetchProducts",
    async () => requests.products.list()
)

export const fetchProductById = createAsyncThunk(
    "catalog/fetchProductById",
    async (productId) => requests.products.details(productId)
)

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchProducts.pending, state => {
            state.status = "pendingFetchProducts";
        });

        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = "idle";
            state.isLoaded = true;
        });

        builder.addCase(fetchProducts.rejected, state => {
            state.status = "idle";
        });

        builder.addCase(fetchProductById.pending, state => {
            state.status = "pendingFetchProductById";
        });

        builder.addCase(fetchProductById.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = "idle";
        });

        builder.addCase(fetchProductById.rejected, state => {
            state.status = "idle";
        })
    }
})

export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectTotal: selectTotalProducts
} = productsAdapter.getSelectors(state => state.catalogStore);