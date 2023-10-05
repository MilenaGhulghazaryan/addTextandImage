import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetCategories = createAsyncThunk("get/categories", async (_, thunkAPI) => {
    try {
        const response = await axios.get("http://localhost:3007/categories")
        return response.data
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const CategorySlice = createSlice({
    name: "category",
    initialState: {
        category: [],
        values: [],
        loading: false,
        error: ""
    },
    extraReducers: {
        [GetCategories.pending]: (state) => {
            state.loading = true
        },
        [GetCategories.fulfilled]: (state, action) => {
            // state.category = action.payload
            state.category = [...state.values, action.payload]
            state.loading = false
            state.error = ""
        },
        [GetCategories.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    },
    reducers: {
        addValue: (state, action) => {
            state.values = [...state.values, { id: Math.random(), element: action.payload }]
        }
    }
})
export const { addValue } = CategorySlice.actions
export default CategorySlice.reducer

