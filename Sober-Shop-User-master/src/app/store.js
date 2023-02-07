import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/Product/productSlice'
import cartReducer from 'components/Cart/CartSlice';
import authReducer from 'features/Auth/authSlice';

const rootReducer = {
    products: productReducer,
    carts: cartReducer,
    auth: authReducer,
}

const store = configureStore({
    reducer: rootReducer
})

export default store;