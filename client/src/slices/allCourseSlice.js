import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allCourses: [],
}

const allCourseSlice = createSlice({
  name: 'allCourses',
  initialState,
  reducers: {
    setAllCourses(state,value){
        state.allCourses = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAllCourses } = allCourseSlice.actions

export default allCourseSlice.reducer