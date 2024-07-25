import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getAllCategories, getAllImages} from "../Services/GlobalServices";

const initialState = {
    //for multiple select component
    selectedImages: new Set(),

    //for single select component
    selectedImage: new Set(),

    //for single select component
    selectedCategories: new Set(),

    colorTypes: [
        {label: "Blue", key: "blue", quantity: null},
        {label: "Red", key: "red", quantity: null},
        {label: "Green", key: "green", quantity: null},
        {label: "Yellow", key: "yellow", quantity: null},
        {label: "Pink", key: "pink", quantity: null},
    ],

    allImages: new Set(), allCategories: new Set(), loading: false, error: "",
}

export const findAllImages = createAsyncThunk("findAllImages", () => {
    return getAllImages()
})

export const findAllCategories = createAsyncThunk("findAllCategories", () => {
    return getAllCategories()
})

export const setSelectedCategories = createAsyncThunk("setSelectedCategories", (e) => {
    return e
})

export const setColorTypes = createAsyncThunk("setColorTypes", (e) => {
    return e
})

export const setSelectedImages = createAsyncThunk("setSelectedImages", (e) => {
    return e
})

export const setSelectedImage = createAsyncThunk("setSelectedImage", (e) => {
    return e
})

export const globalSlice = createSlice({
    name: 'global', initialState, extraReducers: (builder) => {
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

        //for selected categories
        builder.addCase(setSelectedCategories.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(setSelectedCategories.fulfilled, (state, action) => {
            state.selectedCategories = action.payload
            state.loading = false
        })
        builder.addCase(setSelectedCategories.rejected, (state, action) => {
            state.loading = false
            state.error = "An error occurred while setting selected categories"
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

            state.allImages = action.payload
            state.loading = false
        })
        builder.addCase(findAllImages.rejected, (state, action) => {
            state.loading = false
            state.error = "An error occurred while setting selectedImage"
        })


        //for get all categories
        builder.addCase(findAllCategories.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(findAllCategories.fulfilled, (state, action) => {
            state.allCategories = action.payload
            state.loading = false
        })
        builder.addCase(findAllCategories.rejected, (state, action) => {
            state.loading = false
            state.error = "An error occurred while getting all categories"
        })

        //set color types
        builder.addCase(setColorTypes.pending, (state, action) => {
            state.loading = true
            state.error = ""
        })
        builder.addCase(setColorTypes.fulfilled, (state, action) => {
            state.colorTypes = action.payload
            state.loading = false
        })
        builder.addCase(setColorTypes.rejected, (state, action) => {
            state.loading = false
            state.error = "An error occurred while setting color types"
        })


    }
})

// Action creators are generated for each case reducer function
export const {} = globalSlice.actions

export default globalSlice.reducer