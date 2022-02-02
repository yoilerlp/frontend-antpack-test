import { User } from "../Model/User";

export interface ApiResponse {
    msg: string;
    error: boolean;
}

export interface LoginResponse extends ApiResponse {
    data: {
        user: User,
        token: string;
        login: boolean;
    };
}

export interface ListUserResponse extends ApiResponse {
    data: User[] 
}

export interface createUserResponse extends ApiResponse {
    data: User;
}