import {configureStore} from "@reduxjs/toolkit";
import {cartSliceReducer} from "../cart/cartSlice.js";
import {catalogSlice} from "../catalog/catalogSlice.js";

export const store = configureStore({
    reducer: {
        cartStore: cartSliceReducer.reducer,
        catalogStore: catalogSlice.reducer,
    }
});