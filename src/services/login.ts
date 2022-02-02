import { LoginResponse } from '../interfaces/userResonse';
import { api } from "../util/axios"

interface LoginForm {
    email: string;
    password: string;
}

export const loginUser = async  ( data: LoginForm  ) => {
    return await api.post<LoginResponse>('/admin/login', data)
}