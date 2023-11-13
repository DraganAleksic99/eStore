import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from 'axios';

const url = 'https://my-json-server.typicode.com/DraganAleksic99/estore/api/categories';

const sendRequest = (method: string, url: string) => Axios.request({method, url});

export const fetchCategories = createAsyncThunk<string[], void, {rejectValue: string}>(
    'loadCategories',
    async (_, thunkAPI) => {
        try {
            const response = await sendRequest('get', url);
            const data = response.data;
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to load products');
        }
    }
);

type CategoriesState = {
    categories: string[]
    loading: boolean
    error: string | null
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
    error: null
}

export const slice = createSlice({
    name: 'loadCategories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Something went wrong'
        })
    }
});

export default slice.reducer;