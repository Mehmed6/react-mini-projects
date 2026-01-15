import {configureStore} from "@reduxjs/toolkit";
import {cartSliceReducer} from "../cart/cartSlice.js";
import {catalogSlice} from "../catalog/catalogSlice.js";
import {accountSlice} from "../account/accountSlice.js";

export const store = configureStore({
    reducer: {
        cartStore: cartSliceReducer.reducer,
        catalogStore: catalogSlice.reducer,
        accountStore: accountSlice.reducer,
    }
});