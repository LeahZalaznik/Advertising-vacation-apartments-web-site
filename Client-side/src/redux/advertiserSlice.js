import { createSlice } from "@reduxjs/toolkit"

const initialState ={
    advertiser: {},
    currentToken: "", 
}

const advertiserSlice=createSlice({
    name: 'advertiser',
    initialState,
    reducers: {     
        setCurrentAdvertiser(state, action){
            state.advertiser = action.payload
        },
        setCurrentToken(state, action){
            state.currentToken = action.payload
            
            }

    }
})
export const selectAdvertiser = (state) => state.advertiser;
export const selectAdvertiserToken = (state) => state.currentToken;
export const {setCurrentAdvertiser} =advertiserSlice.actions;
export const {setCurrentToken} =advertiserSlice.actions;

export default advertiserSlice.reducer