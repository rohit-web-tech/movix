import { createSlice } from '@reduxjs/toolkit'

export const homeSlice = createSlice({
  name: 'home',
  //setting intial states
  initialState:{
    url:{},
    generes :{}
  },
  //methods to set states
  reducers: {
    getApiConfiguration : (state,action) => {
        state.url = action.payload ;
    },
    getGeneres : (state,action) => {
        state.generes = action.payload ;
    }
  },
})

// Action creators are generated for each case reducer function
export const {getApiConfiguration,getGeneres} = homeSlice.actions

export default homeSlice.reducer