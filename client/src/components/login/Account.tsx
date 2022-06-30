import React, { createContext } from "react";
import {
  CognitoUserSession,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import UserPool from "./UserPool";

interface PropsAccount {
  children: React.ReactNode;
}

export interface AccountCtx {
  authenticate: Function;
  getSession: Function;
  logout: Function;
}

const AccountContext = createContext<AccountCtx | null>(null);

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
      const user = new CognitoUser({ Username: username, Pool: UserPool });

      const authDetails = new AuthenticationDetails({
        Username: username,
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
  };

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
