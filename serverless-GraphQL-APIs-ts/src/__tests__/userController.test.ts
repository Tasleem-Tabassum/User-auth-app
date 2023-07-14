/* eslint-disable linebreak-style */
// /* eslint-disable linebreak-style */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { resolvers } from "../graphql/resolvers";
// import {
//     signUpController,
//     loginController,
//     getUserController,
//     changePasswordController,
//     updateUserController,
// } from "../controllers/userControllers";

// jest.mock("../controllers/userControllers", () => ({
//     signUpController: jest.fn(),
//     loginController: jest.fn(),
//     getUserController: jest.fn(),
//     changePasswordController: jest.fn(),
//     updateUserController: jest.fn(),
// }));

// describe("GraphQL Resolvers", () => {
//     describe("signUp", () => {
//         it("should call signUpController and return the response", async () => {
//             (signUpController as jest.Mock).mockResolvedValue({
//                 statusCode: 201,
//                 body: JSON.stringify({ message: "signup successful" }),
//             });
  
//             const input = {
//                 name: "John Doe",
//                 userName: "johndoe",
//                 password: "password",
//                 mobile: "1234567890",
//                 role: "user",
//             };
  
//             const result = await resolvers.Mutation.signUp(null, { input });
  
//             expect(signUpController).toHaveBeenCalledWith(
//                 input.name,
//                 input.userName,
//                 input.password,
//                 input.role,
//                 input.mobile
//             );
//             expect(result).toEqual({
//                 statusCode: 201,
//                 body: {
//                     message: "signup successful",
//                 },
//             });
//         });
//     });
// });