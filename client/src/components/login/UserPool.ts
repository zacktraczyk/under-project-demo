import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_Nw2fvyiuu",
  ClientId: "58ppvfqpbkgbd4tcok8drcod2",
};

export default new CognitoUserPool(poolData);
