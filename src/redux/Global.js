import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    selectedImages: new Set(),
    loading: false,
    error: "",
}

export const setSelectedImages = createAsyncThunk("setSelectedImages", (e) => {
    return e
})

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(setSelectedImages.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(setSelectedImages.fulfilled, (state, action) => {
            state.selectedImages = action.payload
            state.loading = false
        })
        builder.addCase(setSelectedImages.rejected, (state, action) => {
            state.loading = false
            state.error = "An error occurred while setting selectedImages"
        })
    }
})

// Action creators are generated for each case reducer function
export const {} = globalSlice.actions

export default globalSlice.reducer