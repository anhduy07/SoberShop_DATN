import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authApi from 'api/authApi';
import axiosClient from 'api/axiosClient';

export const setAuthToken = (accessToken) => {
    if (accessToken) {
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    } else {
        delete axiosClient.defaults.headers.common['Authorization']
    }
}

export const getUser = createAsyncThunk("auth/getUser", async (params, thunkApi) => {
    const accessToken = localStorage["minthor-admin-token"];

    if (accessToken) {
        setAuthToken(accessToken);

        const authData = await authApi.confirm();

        if (authData.success) {
            thunkApi.dispatch(token({ isAuthenticated: true, user: authData.data }));
        } else {
            thunkApi.dispatch(token({ isAuthenticated: false, user: null }));
            setAuthToken(null);
            localStorage.removeItem("minthor-admin-token");
        }

        return authData;
    } else {
        thunkApi.dispatch(token({ isAuthenticated: false, user: null }));

        return {
            success: false,
            message: 'Access token not found'
        }
    }
})

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        token: (state, action) => {
            const { isAuthenticated, user } = action.payload;

            state.isAuthenticated = isAuthenticated;
            state.user = user;
        }
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.isLoading = true;
        },
        [getUser.rejected]: (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
        },
        [getUser.fulfilled]: (state) => {
            state.isLoading = false;
        }
    }
})

const { reducer, actions } = authSlice;
export const { token } = actions;
export default reducer;