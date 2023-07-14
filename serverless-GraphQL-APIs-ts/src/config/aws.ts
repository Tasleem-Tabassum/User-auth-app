/* eslint-disable linebreak-style */
import * as AWS from "aws-sdk";

export const dynamodb = new AWS.DynamoDB.DocumentClient();

export default AWS;