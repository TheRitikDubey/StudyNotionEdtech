import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cart: [],
}

const cartSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setCart(state,value){
        state.value = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = cartSlice.actions

export default cartSlice.reducer