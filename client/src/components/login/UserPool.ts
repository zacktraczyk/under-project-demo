import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "",
  ClientId: ""
}

export default new CognitoUserPool(poolData);
