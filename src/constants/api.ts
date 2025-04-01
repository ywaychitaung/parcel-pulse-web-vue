const API_BASE_URL = import.meta.env.VITE_API_URL

export const AUTH_API = {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    GET_CURRENT_USER: `${API_BASE_URL}/api/auth/me`
}

export const USER_API = {
    GET_ALL: `${API_BASE_URL}/api/users`,
    GET_BY_ID: (id: number) => `${API_BASE_URL}/api/users/${id}`
}

export const PARCEL_API = {
    TRACK: (trackingNumber: string) =>
        `${API_BASE_URL}/api/parcels/tracking/${trackingNumber}`,
    GET_ALL: `${API_BASE_URL}/api/parcels`,
    GET_USER_PARCELS: `${API_BASE_URL}/api/parcels/user`,
    CREATE: `${API_BASE_URL}/api/parcels`,
    UPDATE: (id: number) => `${API_BASE_URL}/api/parcels/${id}`,
    DELETE: (id: number) => `${API_BASE_URL}/api/parcels/${id}`,
    SEARCH: `${API_BASE_URL}/api/parcels/search`
}
