import { format } from "date-fns";
import axiosClient from "../utils/axiosClient";

export async function createUser(values,avatarFilename) {
    try {
        const payload = {
          ...values,
          dateOfBirth: values.dateOfBirth ? format(values.dateOfBirth, "yyyy-MM-dd") : undefined,
          avatar: avatarFilename  
        }
        const response=await axiosClient.post('/user/create',payload);
        return response;
            } catch (error) {
        throw error(error.message);
    }


}

export async function editUser(values,avatarFilename) {
    try {
        const payload = {
          ...values,
          dateOfBirth: values.dateOfBirth ? format(values.dateOfBirth, "yyyy-MM-dd") : undefined,
          avatar: avatarFilename  
        }
        const response=await axiosClient.post('/user/create',payload);
        return response;
            } catch (error) {
        throw error(error.message);
    }


}

export async function listUsers(){
    try {
        return await axiosClient.get('/user/');
    } catch (error) {
        throw error(error.message);
    }
}