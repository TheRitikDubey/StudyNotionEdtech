import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")) :null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state,value){
        state.value = value.payload
    },
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { setToken, setLoading,setSignupData } = authSlice.actions

export default authSlice.reducer