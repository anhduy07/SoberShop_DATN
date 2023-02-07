import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { LOCAL_STORAGE } from 'constants/global';
import setAuthToken from 'utils/setAuthToken';

export const getUser = createAsyncThunk('auth/getUser', async(params, thunkAPI) => {
    const accessToken = localStorage[LOCAL_STORAGE.accessToken];

    if(accessToken) {
        setAuthToken(accessToken);

        const authData = await authApi.confirm();

        if(authData.success) {
            thunkAPI.dispatch(confirm({ user: authData.user, isAuthenticated: true }));
        } else {
            thunkAPI.dispatch(confirm({ user: null, isAuthenticated: false }));
            setAuthToken(null);
            localStorage.removeItem(LOCAL_STORAGE.accessToken);
        }

        return authData;
    } else {
        thunkAPI.dispatch(confirm({ user: null, isAuthenticated: false }));

        return { success: false, message: "Not found access token"};
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthLoading: true,
        isAuthenticated: false,
        user: null,
    },
    reducers: {
        confirm: (state, action) => {
            const { user, isAuthenticated } = action.payload;

            state.user = user;
            state.isAuthenticated = isAuthenticated;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: {
        [getUser.pending]: (state) => {
            state.isAuthLoading = true;        
        },
        [getUser.rejected]: (state) => {
            state.isAuthLoading = false;
            state.isAuthenticated = false;
        },
        [getUser.fulfilled]: (state) => {
            state.isAuthLoading = false;
        },
        
    }
});

const { reducer, actions } = authSlice;

export const { confirm, logout } = actions;
export default reducer;