/* eslint-disable linebreak-style */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { signUpController, loginController, getUserController, changePasswordController, updateUserController } from "../controllers/userControllers";
import { SignUpInput, LoginInput, GetUserInput, ChangePasswordInput, UpdateUserInput } from "../models/interfaces";

export const resolvers = {
    Query: {
        users: () => {
            return [
                {
                    id: 1,
                    name: "sam", 
                    userName: "sam123@gmail.com",
                    password: "password",
                    role: "admin",
                    mobile: "7634535",
                    createdAt: "28-06-2023"
                }
            ];
        }
    },

    Mutation: {

        signUp: async (_: any, { input }: { input: SignUpInput }) => {
            try {
                const response = await signUpController(
                    input.name,
                    input.userName,
                    input.password,
                    input.role,
                    input.mobile
                );
                      
                if (response) {
                    return {
                        statusCode: response.statusCode,
                        body: {
                            message: response.body
                        }
                    };
                } else {
                    return {
                        statusCode: 500,
                        body: {
                            message: "Something went wrong. Please try later"
                        }
                    };
                }
            } catch (e) {
                console.log("ERROR!", e);
                return {
                    statusCode: 500,
                    body: {
                        message: "Internal Server Error"
                    }
                };
            }
        },

        login: async (_: any, { input }: { input: LoginInput }) => {
            try {
                const response = await loginController(input.userName, input.password);

                if (response) {
                    return {
                        statusCode: response.statusCode,
                        body: {
                            message: response.body
                        }
                    };
                } else {
                    return {
                        statusCode: 500,
                        body: {
                            message: "Something went wrong. Please try later"
                        }
                    };
                }
            } catch (e) {
                console.log("ERROR!", e);
                return {
                    statusCode: 500,
                    body: {
                        message: "Internal Server Error"
                    }
                };
            }         
        },

        getUser: async (_: any, { input }: { input: GetUserInput}) => {
            try {
                const response = await getUserController(input.token);

                if (response) {
                    return {
                        statusCode: response.statusCode,
                        body: {
                            message: response.body
                        }
                    };
                } else {
                    return {
                        statusCode: 500,
                        body: {
                            message: "Something went wrong. Please try later"
                        }
                    };
                }
            } catch (e) {
                console.log("ERROR!", e);
                return {
                    statusCode: 500,
                    body: {
                        message: "Internal Server Error"
                    }
                };
            }
        },

        changePassword: async (_: any, { input }: { input: ChangePasswordInput}) => {
            try {
                const response = await changePasswordController(
                    input.token,
                    input.userName,
                    input.oldPassword,
                    input.newPassword,
                );

                if (response) {
                    return {
                        statusCode: response.statusCode,
                        body: {
                            message: response.body
                        }
                    };
                } else {
                    return {
                        statusCode: 500,
                        body: {
                            message: "Something went wrong. Please try later"
                        }
                    };
                }
            } catch (e) {
                console.log("ERROR!", e);
                return {
                    statusCode: 500,
                    body: {
                        message: "Internal Server Error"
                    }
                };
            }
        },

        updateUser: async (_: any, { input }: { input: UpdateUserInput}) => {
            try {
                const response = await updateUserController(
                    input.token,
                    input.name,
                    input.userName,
                    input.role,
                );

                if (response) {
                    return {
                        statusCode: response.statusCode,
                        body: {
                            message: response.body
                        }
                    };
                } else {
                    return {
                        statusCode: 500,
                        body: {
                            message: "Something went wrong. Please try later"
                        }
                    };
                }
            } catch (e) {
                console.log("ERROR!", e);
                return {
                    statusCode: 500,
                    body: {
                        message: "Internal Server Error"
                    }
                };
            }
        }
    }
};
