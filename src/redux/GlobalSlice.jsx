import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    value: 0,
    loading: false,
    error: "",
}

export const increase = createAsyncThunk("increase", (incAmount) => {
    return incAmount
})

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    extraReducers: (builder) => {
        //increase reducers
        builder.addCase(increase.pending, (state) => {
            state.loading = true
        })
        builder.addCase(increase.rejected, (state) => {
            state.loading = false
            state.error = "An error occurred while increase"
        })
        builder.addCase(increase.fulfilled, (state, action) => {
            state.loading = false
            state.value += action.payload
        })

    }
})

// Action creators are generated for each case reducer function
export const {} = globalSlice.actions

export default globalSlice.reducer