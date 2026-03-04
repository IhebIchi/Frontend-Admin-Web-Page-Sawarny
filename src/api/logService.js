import axiosClient from "../utils/axiosClient";

/**
 * Get all logs
 */
export async function getAllLogs() {
    try {
        const response = await axiosClient.get('/logs/');
        return response;
    } catch (error) {
        throw error;
    }
}

/**
 * Get log by ID
 */
export async function getLogById(logId) {
    try {
        const response = await axiosClient.get('/logs/' + logId);
        return response;
    } catch (error) {
        throw error;
    }
}
