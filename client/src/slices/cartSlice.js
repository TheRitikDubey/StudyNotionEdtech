import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const initialState = {
  initialItem: localStorage.getItem('totalItems') || 0,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state,value){
        state.value = value.payload
    },
    resetCart(state,value){
      state.value = ""
    }
    // add to cart function
    // remove from cart function
    // reset cart function
  },
})

// Action creators are generated for each case reducer function
export const { setTotalItems, resetCart } = cartSlice.actions

export default cartSlice.reducer