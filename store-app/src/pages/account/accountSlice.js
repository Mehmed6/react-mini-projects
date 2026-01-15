import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
//import {router} from "../../routes/index.jsx";
import requests, {setAuthToken} from "../../api/apiClient.js";

const initialState = {
    user: null,
    status: "idle",
};

export const loginUser = createAsyncThunk(
    "account/loginUser",
    async (data, thunkAPI) => {
        try {
            const user = await requests.account.login(data);
            localStorage.setItem("user", JSON.stringify(user));
            //await router.navigate("/");
            setAuthToken(user.token)
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

export const registerUser = createAsyncThunk(
    "account/registerUser",
    async (data, thunkAPI) => {
        try {
            await requests.account.register(data);
            //await router.navigate("/login");
            return true;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    }
)

export const getUser = createAsyncThunk(
    "account/getUser",
    async (_, thunkAPI) => {
        try {
            const user = await requests.account.getUser();
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (error) {
            return thunkAPI.rejectWithValue({error: error.message});
        }
    },
    {
        condition: () => !!localStorage.getItem("user")
    }
)

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: state => {
            state.user = null;
            localStorage.removeItem("user");
            //router.navigate("/login").then(() => console.log("deneme"));
        }
    },
    extraReducers: builder => {
        builder.addCase(loginUser.pending, state => {
            state.status = "pending";
        });

        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.status = "idle";
        });

        builder.addCase(loginUser.rejected, state => {
            state.status = "idle";
        });

        builder.addCase(registerUser.pending, state => {
            state.status = "pending";
        });

        builder.addCase(registerUser.fulfilled, state => {
            state.status = "idle";
        });

        builder.addCase(registerUser.rejected, state => {
            state.status = "idle";
        });

        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
        });

        builder.addCase(getUser.rejected, state => {
            state.user = null;
            localStorage.removeItem("user");
            //router.navigate("/login").then(() => console.log("deneme"));
        })

    }
})

export const {setUser, logout} = accountSlice.actions;