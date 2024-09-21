const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/getAllCourses`
}

export const Auth = {
    LOGIN_API: `${BASE_URL}/auth/login`,
    RESETPASSTOKEN_API: `http://localhost:9521/api/v1/auth/reset-password-token`,
    SENDOTP_API:`${BASE_URL}/sendotp`
}
