import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const GetGenders = createAsyncThunk('get/gender', async (_, thunkApi) => {
    try {
        const response = await axios.get('http://localhost:3007/genders')
        return response.data
    } catch (err) {
        return thunkApi.rejectWithValue(err)
    }

})

const GendersSlice = createSlice({
    name: 'genders',
    initialState: {
        genders: [],
        loading: false,
        error: ""
    },
    extraReducers: {
        [GetGenders.pending]: (state) => {
            state.loading = true
        },
        [GetGenders.fulfilled]: (state, action) => {
            state.genders = action.payload
            state.loading = false
            state.error = ''
        },
        [GetGenders.rejected]: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export default GendersSlice.reducer