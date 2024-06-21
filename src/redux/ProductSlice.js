import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {findAllProductAndImage, findAllProductAndImageWishlist} from '../Services/ProductServices.js'

const initialState = {
    productAndImage: [],
    productAndImageWishlist: [],
    discountedProducts: [],

    loading: false,
    error: "",
}

export const getProductAndImage = createAsyncThunk("getProductAndImage", (requestParams) => {
    return findAllProductAndImage(requestParams)
})

export const getProductAndImageWishlist = createAsyncThunk("getProductAndImageWishlist", (requestParams) => {
    return findAllProductAndImageWishlist(requestParams)
})
export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {

        //this reducer is fetching all products and images from db
        builder.addCase(getProductAndImage.pending, (state) => {
            state.loading = true
            state.error = []
        })
        builder.addCase(getProductAndImage.fulfilled, (state, action) => {
            state.loading = false
            state.productAndImage = action.payload
        })
        builder.addCase(getProductAndImage.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        //this reducer is fetching all products and images from db for wishlist
        builder.addCase(getProductAndImageWishlist.pending, (state) => {
            state.loading = true
            state.error = []
        })
        builder.addCase(getProductAndImageWishlist.fulfilled, (state, action) => {
            state.loading = false
            state.productAndImageWishlist = action.payload
        })
        builder.addCase(getProductAndImageWishlist.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
})

// Action creators are generated for each case reducer function
export const {} = productSlice.actions

export default productSlice.reducer