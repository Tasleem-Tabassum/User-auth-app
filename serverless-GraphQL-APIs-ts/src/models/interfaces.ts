/* eslint-disable linebreak-style */
export interface User {
    id?: string;
    name?: string;
    userName: string;
    mobile: string;
    password: string;
    role?: string;
    createdAt?: string; 
}

export interface SignUpInput {
    name: string;
    userName: string;
    password: string;
    role: string;
    mobile: string;
}

export interface LoginInput {
    userName: string;
    password: string;
    mobile: string;
}

export interface GetUserInput {
    token: string;
}

export interface ChangePasswordInput {
    token: string;
    userName: string;
    mobile: string;
    oldPassword: string;
    newPassword: string;
}

export interface UpdateUserInput {
    token: string;
    name: string;
    userName: string;
    password: string;
    role: string;
    mobile: string;
}

