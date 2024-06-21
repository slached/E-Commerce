import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getCart, getWishlist} from "../Services/UserServices";

const initialState = {
    cart: null,
    wishlist: null,

    loading: false,
    error: "",
}

export const getCartItems = createAsyncThunk("getCartItems", (fetchObject) => {
    return getCart(fetchObject)
})

export const getWishlistItems = createAsyncThunk("getWishlistItems", (fetchObject) => {
    return getWishlist(fetchObject)
})

export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCartItems.rejected, (state) => {
            state.loading = false
            state.error = "Error occurred while getting items in the cart"
        })
        builder.addCase(getCartItems.fulfilled, (state, action) => {
            state.loading = false
            state.cart = action.payload
        })
        builder.addCase(getCartItems.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getWishlistItems.rejected, (state) => {
            state.loading = false
            state.error = "Error occurred while getting items in the wishlist"
        })
        builder.addCase(getWishlistItems.fulfilled, (state, action) => {
            state.loading = false
            state.wishlist = action.payload
        })
        builder.addCase(getWishlistItems.pending, (state) => {
            state.loading = true
        })
    }
})

// Action creators are generated for each case reducer function
export const {} = userSlice.actions

export default userSlice.reducer