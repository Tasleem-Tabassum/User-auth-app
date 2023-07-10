import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type User {
        id: ID
        name: String
        userName: String!
        password: String!
        mobile: String!
        role: String
        createdAt: String
    }

    type Query {
        users: [User]
    }

    type JSONResponse {
        message: String!
    }

    type Response {
        statusCode: Int!
        body: JSONResponse!
    }

    input SignUpInput {
        name: String!
        userName: String!
        password: String!
        mobile: String!
        role: String!
    }

    input LoginInput {
        userName: String!
        password: String!
        mobile: String!
    }

    input GetUserInput {
        token: String!
    }

    input ChangePasswordInput {
        token: String!
        userName: String!
        mobile: String!
        oldPassword: String!
        newPassword: String!
    }

    input UpdateUserInput {
        token: String!
        name: String!
        userName: String!
        password: String!
        mobile: String!
        role: String!
    }

    type Mutation {
        signUp(input: SignUpInput!) : Response
        login(input: LoginInput!) : Response
        getUser(input: GetUserInput!): Response
        changePassword(input: ChangePasswordInput!): Response
        updateUser(input: UpdateUserInput!): Response
    }

    schema {
        query: Query
        mutation: Mutation
    }
`;
