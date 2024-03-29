import { createSlice } from '@reduxjs/toolkit';
import StorageKeys from '../../constants/storageKeys';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showMiniCart: false,
    cartItems: JSON.parse(localStorage.getItem(StorageKeys.CART)) || [],
  },
  reducers: {
    addToCart(state, action) {
      const indexItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexItem >= 0) {
        state.cartItems[indexItem].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },
    addOnToCart(state, action) {
      const indexItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (indexItem >= 0) {
        state.cartItems[indexItem].quantity += 1;
      } else {
        state.cartItems.push(action.payload);
      }
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },
    decreaseOnCart(state, action) {
      const indexItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      const indexQuantity = state.cartItems[indexItem].quantity;
      if (indexQuantity > 1) {
        state.cartItems[indexItem].quantity -= 1;
      } else if (indexQuantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      }
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem(StorageKeys.CART, JSON.stringify(state.cartItems));
    },
  },
  extraReducers: {},
});

const { actions, reducer } = cartSlice;
export const { clearCart, removeFromCart, addToCart, decreaseOnCart, addOnToCart } =
  actions;
export default reducer;
