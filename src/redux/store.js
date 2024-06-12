import {configureStore} from '@reduxjs/toolkit'
import ProductReducer from "./ProductSlice";
import SwiperSlice from "./SwiperSlice";
import UserSlice from "./UserSlice";

export const store = configureStore({
    reducer: {
        productReducer: ProductReducer,
        swiperReducer: SwiperSlice,
        userReducer: UserSlice
    },
})