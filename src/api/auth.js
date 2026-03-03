import { Navigate } from "react-router-dom";
import axiosClient from "../utils/axiosClient";

export async function changePassword(values) {
    try {
         const response=await axiosClient.put('/auth/change-password',values);
            form.resetFields();
            Navigate('/user/profile');
    } catch (error) {
        throw error(error.message);
    }
}