import {createContext, useContext, useState} from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export function useCartContext() {
    return useContext(CartContext);
}

export function CartContextProvider({children}) {
    const [cart, setCart] = useState(null);

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}