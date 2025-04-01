const API_BASE_URL = import.meta.env.VITE_API_URL

export const AUTH_API = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
    GET_CURRENT_USER: `${API_BASE_URL}/auth/me`
}
