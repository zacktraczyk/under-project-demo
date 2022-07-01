import React, { createContext } from "react";
import axios from "axios";
import {
  CognitoUserSession,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

interface PropsAccount {
  children: React.ReactNode;
}

// export interface AccountCtx {
//   authenticate: Function;
//   getSession: Function;
//   logout: Function;
// }

const AccountContext = createContext<any | null>(null);

const Account = (props: PropsAccount) => {
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err: Error, session: CognitoUserSession | null) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (username: string, password: string) => {
    return await new Promise((resolve, reject) => {
      axios
        .get(
          " https://1jsob4hkr0.execute-api.us-east-2.amazonaws.com/prod/main/" +
            username
        )
        .then((response) => {
          console.log(response);
          console.log(response.data[0].formId);
          const user = new CognitoUser({
            Username: response.data[0].formId,
            Pool: UserPool,
          });

          const authDetails = new AuthenticationDetails({
            Username: response.data.formId,
            Password: password,
          });

          user.authenticateUser(authDetails, {
            onSuccess: (data) => {
              console.log("Account.ts: onSuccess:", data);
              resolve(data);
            },
            onFailure: (err) => {
              console.error("Account.ts: onFailure:", err);
              reject(err);
            },
            newPasswordRequired: (data) => {
              console.log("Account.ts: newPasswordRequired:", data);
              resolve(data);
            },
          });
        });
    });
  };

  // EXAMPLE USER CONFIRMATION:
  // aws cognito-idp confirm-sign-up --client-id 16qljlmrbg2sg7rr9spuv0orsh --username ea73fd5b-ab18-4e60-b08f-3c4f051008a6 --confirmation-code 884861

  //FOLLOWING IS FOR CONFIRMING A USER ONCE THERE IS A UI FOR THEM TO PUT THE CODE THEY GOT IN THE EMAIL
  // const confirm = async () => {
  //   return await new Promise((resolve, reject) => {
  //     const user = new CognitoUser({ Username: username, Pool: UserPool });

  //     const authDetails = new AuthenticationDetails({
  //       Username: username,
  //       Password: password,
  //     });

  //     user.confirmRegistration("CODE", false, callback)
  // }
  const logout = () => {
    console.log("Account.tsx: logout(): Logging OUT");
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
