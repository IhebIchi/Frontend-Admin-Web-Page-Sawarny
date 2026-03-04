import { format } from "date-fns";
import axiosClient from "../utils/axiosClient";

/**
 * Format user data payload for API
 */
function formatUserPayload(values, avatarFilename) {
    return {
        ...values,
        dateOfBirth: values.dateOfBirth ? format(values.dateOfBirth, "yyyy-MM-dd") : undefined,
        avatar: avatarFilename
    };
}

/**
 * Create a new user
 */
export async function createUser(values, avatarFilename) {
    try {
        const payload = formatUserPayload(values, avatarFilename);
        const response = await axiosClient.post('/user/create', payload);
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * Update an existing user (primary function)
 */
export async function updateUser(userId, values, avatarFilename) {
    try {
        const payload = formatUserPayload(values, avatarFilename);
        const response = await axiosClient.put('/user/update/' + userId, payload);
        return response;
    } catch (error) {
        throw error.response.data.message;
    }
}

/**
 * Edit an existing user (alias for updateUser - backward compatibility)
 */
export async function editUser(values, avatarFilename) {
    if (values._id || values.id) {
        return updateUser(values._id || values.id, values, avatarFilename);
    }
    throw new Error("User ID is required to edit user");
}

/**
 * List all users
 */
export async function listUsers() {
    try {
        return await axiosClient.get('/user/');
    } catch (error) {
        throw error.response.data.message;
    }
}

/**
 * Get user by ID
 */
export async function getUserById(userId) {
    try {
        const response = await axiosClient.get('/user/' + userId);
        return response;
    } catch (error) {
        throw error;
    }
}
