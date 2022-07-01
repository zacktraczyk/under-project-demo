import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserPool from "./UserPool";
import LoginUser from "./LoginUser";
import CreateUser from "./CreateUser";

import "./Login.css";

interface LoginProps {
  onSubmission: Function;
}

export default function Login(props: LoginProps) {
  const [loginSlide, setLoginSlide] = useState(true);
  const [loginError, setLoginError] = useState<Error | null>(null);

  console.log(loginError);

  return (
    <div className="login">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
      >
        <ol>
          <li>
            <h1
              className={loginSlide ? "selected" : ""}
              onClick={() => {
                setLoginSlide(true);
                setLoginError(null);
              }}
            >
              Login
            </h1>
          </li>
          <li>
            <h1
              className={!loginSlide ? "selected" : ""}
              onClick={() => {
                setLoginSlide(false);
                setLoginError(null);
              }}
            >
              Create User
            </h1>
          </li>
        </ol>

        <div className="slider-container">
          <AnimatePresence>
            {loginSlide && (
              <LoginUser
                onLogin={props.onSubmission}
                displayError={(error: Error) => setLoginError(error)}
              />
            )}
            {!loginSlide && (
              <CreateUser
                onLogin={props.onSubmission}
                displayError={(error: Error) => setLoginError(error)}
                setLoginSlide={setLoginSlide}
              />
            )}

            {loginError != undefined && (
              <div className="error-container">
                <motion.div
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 30, opacity: 0 }}
                >
                  <p className="request-error">{"" + loginError.message}</p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
