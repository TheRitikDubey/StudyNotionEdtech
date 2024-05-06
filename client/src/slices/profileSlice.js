import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser(state,value){
        state.value = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUser } = profileSlice.actions

export default profileSlice.reducer