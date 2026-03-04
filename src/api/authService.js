import axiosClient from "../utils/axiosClient";

/**
 * Change user password
 */
export async function changePassword(values) {
    try {
        const response = await axiosClient.put('/auth/change-password', values);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * Login user
 */
export async function login(values) {
    try {
        const response = await axiosClient.post('/auth/login', values);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * Get current authenticated user
 */
export async function getCurrentUser() {
    try {
        const response = await axiosClient.get('/auth/me');
        return response;
    } catch (error) {
        throw error;
    }
}
