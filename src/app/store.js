import userReducer from '../features/Auth/userSlice';
import cartReducer from '../features/Cart/cartSlice';

const { configureStore } = require('@reduxjs/toolkit');

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
