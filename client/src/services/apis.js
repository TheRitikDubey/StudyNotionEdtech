const BASE_URL = process.env.REACT_APP_BASE_URL

export const categories = {
    CATEGORIES_API: `${BASE_URL}/course/getAllCourses`
}

export const Auth = {
    LOGIN_API: `${BASE_URL}/auth/login`
}
