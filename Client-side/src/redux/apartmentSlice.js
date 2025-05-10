import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    
    list: []
}

const apartmentSlice=createSlice({
    name: 'apartments',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.list = action.payload
        }
        
    }
})
export const {setList} =apartmentSlice.actions;
export default apartmentSlice.reducer