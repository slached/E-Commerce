import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

const initialState = {
    flashSaleSwiper: null,
    loading: false,
    error: "",
}

export const setFlashSaleSwiper = createAsyncThunk("setFlashSaleSwiper", (e) => {
    return e
})

export const swiperSlice = createSlice({
    name: 'swiper',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(setFlashSaleSwiper.rejected, (state) => {
            state.loading = false
            state.error = "Error occurred while setting flash sale swiper"
        })
        builder.addCase(setFlashSaleSwiper.fulfilled, (state, action) => {
            state.loading = false
            state.flashSaleSwiper = action.payload
        })
        builder.addCase(setFlashSaleSwiper.pending, (state) => {
            state.loading = true
        })
    }
})

// Action creators are generated for each case reducer function
export const {} = swiperSlice.actions

export default swiperSlice.reducer