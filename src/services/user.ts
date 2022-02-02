import { api } from '../util/axios';
import { createUserResponse, ListUserResponse, ApiResponse } from '../interfaces/userResonse';
import { getToken } from '../util/token';
import { User } from '../Model/User';



export const getUsers = async () => {

    const token = getToken();

    return await api.get<ListUserResponse>("/user/getall", {
        headers: {
            "access-token": token || ""
        }
    })
}

export const createUser = async (data: User) => {
    const token = getToken();
      console.log(token)
    return await api.post<createUserResponse>("/user/create", data, {
        headers: {
            "access-token": token || ""
        }
    })

}

export const UpdateUser = async (id: string, data: User) => {
    const token = getToken();

    return await api.put<ApiResponse>(`/user/update/${id}`, data, {
         headers: {
            "access-token": token || ""
        }
    })
}

export const deleteUser = async (id: string) => {
    const token = getToken();
    return await api.delete<ApiResponse>(`/user/delete/${id}`, {
         headers: {
            "access-token": token || ""
        }
    })
}