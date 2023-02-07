import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import favouriteProductApi from 'api/favouriteProductApi'
import {ENDPOINT} from "../../constants/global";
import cartApi from "../../api/cartApi";
import orderApi from "../../api/orderApi";

export const getAllWishList = createAsyncThunk(ENDPOINT.favouriteProduct.getAll, async (params, thunkAPI) => {
  const response = await favouriteProductApi.getAll();

  if (response.success) {
    thunkAPI.dispatch(setWishList(response.data));
  }

  return response;
});

export const deleteWishList = createAsyncThunk(ENDPOINT.favouriteProduct.delete, async (params, thunkAPI) => {
  const response = await favouriteProductApi.delete(params.id);

  if (response.success) {
    thunkAPI.dispatch(removeWishList(response.data._id));
  }

  console.log(response.data._id);
  return response;
});

export const getAllCarts = createAsyncThunk(ENDPOINT.cart.getAll, async (params, thunkAPI) => {
  const response = await cartApi.getAll();

  if (response.success) {
    thunkAPI.dispatch(setCarts(response.carts));
  }

  return response;
});

export const addCart = createAsyncThunk(ENDPOINT.cart.add, async (params, thunkAPI) => {
  const response = await cartApi.add(params.body);

  if (response.success) {
    thunkAPI.dispatch(setCountCart(thunkAPI.getState().carts.countCart + 1));
  }

  return response;
});

export const deleteCart = createAsyncThunk(ENDPOINT.cart.delete, async (params, thunkAPI) => {
  const response = await cartApi.delete(params.id);

  if (response.success) {
    thunkAPI.dispatch(removeCart(response.cart._id));
  }

  return response;
});

export const getCountCart = createAsyncThunk(ENDPOINT.cart.getCount, async (params, thunkAPI) => {
  const response = await cartApi.getCount();

  if (response.success) {
    thunkAPI.dispatch(setCountCart(response.count));
  }

  return response;
});

export const addOrder = createAsyncThunk(ENDPOINT.order.addOrder, async (params, thunkAPI) => {
  const response = await orderApi.addOrder(params.body);

  if (response.success) {
    thunkAPI.dispatch(setCarts([]));
  }

  return response;
});

export const orderPaymentPaypal = createAsyncThunk("/payment/paypal", async (params, thunkAPI) => {
  const response = await orderApi.paymentPaypal(params.body);
  if (response) {
    thunkAPI.dispatch(setCarts([]));
    // window.open(response?.links[1].href, "_blank");
  }

  return response;
});

const initialProduct = {
  wishList: [],
  cartList: [],
  countCart: 0
}

const cartSlice = createSlice ({
  name: 'cart',
  initialState: initialProduct,
  reducers: {
    setWishList: (state, action) => {
      state.wishList = action.payload;
    },
    removeWishList: (state, action) => {
      state.wishList = state.wishList.filter(item => item._id !== action.payload);
    },
    setCarts: (state, action) => {
      state.cartList = action.payload;
    },
    clearCarts: (state) => {
      state.cartList = [];
      state.countCart = 0;
    },
    removeCart: (state, action) => {
      state.cartList = state.cartList.filter(item => item._id !== action.payload);
    },
    setCountCart: (state, action) => {
      state.countCart = action.payload;
    },
  }
})
const { reducer, actions } = cartSlice;

export const { setWishList, removeWishList, setCarts, removeCart, setCountCart, clearCarts } = actions;
export default reducer;
