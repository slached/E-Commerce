import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getAllImages} from "../Services/GlobalServices";

const initialState = {
    //for multiple select component
    selectedImages: new Set(),

    //for single select component
    selectedImage: new Set(),

    allImages: new Set(),
    loading: false,
    error: "",
}

export const findAllImages = createAsyncThunk("findAllImages", () => {
    return getAllImages()
})

export const setSelectedImages = createAsyncThunk("setSelectedImages", (e) => {
    return e
})

export const setSelectedImage = createAsyncThunk("setSelectedImage", (e) => {
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

        //for single select
        builder.addCase(setSelectedImage.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(setSelectedImage.fulfilled, (state, action) => {
            state.selectedImage = action.payload
            state.loading = false
        })
        builder.addCase(setSelectedImage.rejected, (state, action) => {
            state.loading = false
            state.error = "An error occurred while setting selectedImage"
        })

        //for get all images
        builder.addCase(findAllImages.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(findAllImages.fulfilled, (state, action) => {

            const images = new Set()
            for (const eachObject of action.payload) images.add({
                key: eachObject._id, label: eachObject.name
            })

            state.allImages = images
            state.loading = false
        })
        builder.addCase(findAllImages.rejected, (state, action) => {
            state.loading = false
            state.error = "An error occurred while setting selectedImage"
        })
    }
})

// Action creators are generated for each case reducer function
export const {} = globalSlice.actions

export default globalSlice.reducer