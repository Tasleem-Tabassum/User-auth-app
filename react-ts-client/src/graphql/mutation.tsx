/* eslint-disable linebreak-style */
import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
    mutation SignUp($input: SignUpInput!) {
        signUp(input: $input) {
            statusCode
            body {
                message
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation Login($input: LoginInput!) {
        login(input: $input) {
            statusCode
            body {
                message
            }
        }
    }
`;

export const GET_USER = gql`
    mutation GetUser($input: GetUserInput!) {
        getUser(input: $input) {
            statusCode
            body {
                message
            }
        }
    }
`;

export const CHANGE_PASSWORD = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
        changePassword(input: $input) {
            statusCode
            body {
                message
            }
        }
    }
`;

export const UPDATE_PROFILE = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
        updateUser(input: $input) {
            statusCode
            body {
                message
            }
        }
    }
`;
