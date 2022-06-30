import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_arD1zUJ7q",
  ClientId: "16qljlmrbg2sg7rr9spuv0orsh",
};

export default new CognitoUserPool(poolData);
