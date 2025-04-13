import { toast } from "react-hot-toast"

import { setLoading, setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { profileEndpoints } from "../apis"
import { logout } from "./authAPI"

const {
  GET_USER_DETAILS_API,
  GET_USER_ENROLLED_COURSES_API,
  GET_INSTRUCTOR_DATA_API,
} = profileEndpoints

export function getUserDetails(token, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    try {
      dispatch(setLoading(true))
      const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`,
      })
      console.log("GET_USER_DETAILS API RESPONSE............", response.data.success)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      const userImage = response.data.userData.Image
        ? response.data.userData.Image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.userData.firstName} ${response.data.userData.lastName}`
      dispatch(setUser({ ...response.data.userData, image: userImage }))
    } catch (error) {
      dispatch(logout(navigate))
      console.log("GET_USER_DETAILS API ERROR............", error)
      toast.error("Could Not Get User Details")
    } finally {
       toast.dismiss(toastId)
       dispatch(setLoading(false))
    }
  }
}

export async function getUserEnrolledCourses(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector(
      "GET",
      GET_USER_ENROLLED_COURSES_API,
      null,
      {
        Authorization: `Bearer ${token}`,
      }
    )
    // console.log(
    //   "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data
  } catch (error) {
    console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
    toast.error("Could Not Get Enrolled Courses")
  }
  toast.dismiss(toastId)
  return result
}

export async function getInstructorData(token) {
  const toastId = toast.loading("Loading...")
  let result = []
  try {
    const response = await apiConnector("GET", GET_INSTRUCTOR_DATA_API, null, {
      Authorization: `Bearer ${token}`,
    })
    console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
    result = response?.data?.courses
  } catch (error) {
    console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
    toast.error("Could Not Get Instructor Data")
  }
  toast.dismiss(toastId)
  return result
}
