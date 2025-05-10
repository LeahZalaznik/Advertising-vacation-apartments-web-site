import { configureStore } from "@reduxjs/toolkit"
import apartmentReduser from "./apartmentSlice"
import advertiserSlice from "./advertiserSlice"
const store = configureStore({
    reducer: {
       apartment : apartmentReduser,
       advertiser:advertiserSlice
    }
})

export default store