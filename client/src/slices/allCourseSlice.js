import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allCourses: []
}

const allCourseSlice = createSlice({
  name: 'allCourses',
  initialState,
  reducers: {
    setCourse(state,value){
        state.value = value.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCourse } = allCourseSlice.actions

export default allCourseSlice.reducer