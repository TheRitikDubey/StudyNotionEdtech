const BASE_URL = process.env.REACT_APP_BASE_URL
const LOCAL_URL= process.env.REACT_APP_BE_URL

export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/getAllCourses`
}

export const Auth = {
    LOGIN_API: `${BASE_URL}/auth/login`,
    RESETPASSTOKEN_API: `${BASE_URL}/auth/reset-password-token`,
    SENDOTP_API:`${BASE_URL}/auth/sendotp`,
    RESETPASSWORD_API: `${BASE_URL}/auth/reset-password`,
    SIGNUP_API: `${BASE_URL}/auth/signup`

}

export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    GET_USER_ENROLLED_COURSES_API: LOCAL_URL + "/profile/getEnrolledCourse",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
}


// CONTACT-US API
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const settingsEndpoints = {
    UPDATE_DISPLAY_PICTURE_API: LOCAL_URL + "/profile/updateDisplayPicture",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
    DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}
