import axiosClient from "../utils/axiosClient";

/**
 * Upload a file to the server*/
export async function uploadFile(file) {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axiosClient.post('/file/uploads', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response;
    } catch (error) {
        throw error;
    }
}
