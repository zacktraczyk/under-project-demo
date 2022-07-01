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

  const authenticate = async (email: string, password: string) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log("Account.ts/Authenticate: onSuccess:", data);
          resolve(data);
        },
        onFailure: (err) => {
          console.error("Account.ts/Authenticate: onFailure:", err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("Account.ts/Authenticate:: newPasswordRequired:", data);
          resolve(data);
        },
      });
    });
  };

  // EXAMPLE USER CONFIRMATION:
  // aws cognito-idp confirm-sign-up --client-id 16qljlmrbg2sg7rr9spuv0orsh --username email@email.com --confirmation-code 884861

  //FOLLOWING IS FOR CONFIRMING A USER ONCE THERE IS A UI FOR THEM TO PUT THE CODE THEY GOT IN THE EMAIL
  const confirm = async (email: string, code: string) => {
    return await new Promise((resolve, reject) => {
      console.log("Inside Account:", email, UserPool);
      const user = new CognitoUser({ Username: email, Pool: UserPool });
      const callback = (err: any, result: any) => {
        if (err) {
          console.error("Account.ts/confirm: onFailure:", err);
          reject(err);
        } else {
          console.log("Account.ts/confirm: onSuccess:", result);
          resolve(result);
        }
      };
      user.confirmRegistration(code, false, callback);
    });
  };

  const logout = () => {
    console.log("Account.tsx: logout(): Logging OUT");
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };

  return (
    <AccountContext.Provider
      value={{ authenticate, confirm, getSession, logout }}
    >
      {props.children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
