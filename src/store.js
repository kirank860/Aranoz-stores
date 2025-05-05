import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice';
import authReducer from './features/auth/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    // Add other reducers here
  },
});

export default store; 