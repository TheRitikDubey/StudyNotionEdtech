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
