import React, { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    cart: {
        shippingAddress: localStorage.getItem('ahippingAddress') ? JSON.parse(localStorage.getItem('ahippingAddress')) : {},
        cartItems: localStorage.getItem('cartItem') ? JSON.parse(localStorage.getItem('cartItem')) : [],
        paymentMethos: localStorage.getItem('paymentMeyhod') ? JSON.stringify(localStorage.getItem('paymentMeyhod')) : '',
    }
}

function reducer(state, action) {
    switch (action.type) {
        case 'CART_ADD_ITEM':
            // add to cart
            const newItem = action.payload;
            const exisItem = state.cart.cartItems.find(
                (item) => item._id === newItem._id
            )
            const cartItems = exisItem
                ? state.cart.cartItems.map((item) =>
                    item._id === exisItem._id ? newItem : item
                )
                :
                [...state.cart.cartItems, newItem];
            localStorage.setItem('cartItem', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } };

        case 'CART_REMOVE_ITEM': {
            const cartItems = state.cart.cartItems.filter((item) => item._id !== action.payload._id);
            localStorage.setItem('cartItem', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } };
        }

        case 'USER_SIGNIN':
            return { ...state, userInfo: action.payload }

        case 'USER_SIGNOUT':
            return { ...state, userInfo: null, cart: { cartItems: [], shippingAddress: {}, paymentMethos: '' } }

        case 'SAVE_SHOPPING_ADDRESS':
            return { ...state, cart: { ...state.cart, shippingAddress: action.payload } }

        case 'SAVE_PAYMENT_METHOD':
            return { ...state, cart: { ...state.cart, paymentMethos: action.payload } }

        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
} 