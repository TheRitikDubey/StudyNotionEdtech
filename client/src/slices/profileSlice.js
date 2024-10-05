import { createSlice } from '@reduxjs/toolkit'
import { setLoading } from './authSlice'

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state,value){
        state.value = value.payload
    },
    setLoading(state,value){
      state.value = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = profileSlice.actions

export default profileSlice.reducer