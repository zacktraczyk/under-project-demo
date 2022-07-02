import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import UserPool from "./UserPool";
import LoginUser from "./LoginUser";
import CreateUser from "./CreateUser";
import "../../styles/components/Login.scss";
import exampleDesktop from "../../assets/desktop.jpg";

interface LoginProps {
  onSubmission: Function;
}

export default function Login(props: LoginProps) {
  const [loginSlide, setLoginSlide] = useState(true);
  const [loginError, setLoginError] = useState<Error | null>(null);
  const [loginSuccess, setLoginSuccess] = useState<string | any>("");

  console.log(loginError);

  return (
    <div className="login-page-container">
      <div className="login">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
        >
          <div className="slider-container">
            <AnimatePresence>
              {loginSlide && (
                <LoginUser
                  onLogin={props.onSubmission}
                  displayError={(error: Error) => setLoginError(error)}
                  setLoginSlide={setLoginSlide}
                  setLoginError={setLoginError}
                  displaySuccess={(message: string) => setLoginSuccess(message)}
                />
              )}
              {!loginSlide && (
                <CreateUser
                  onLogin={props.onSubmission}
                  displayError={(error: Error) => setLoginError(error)}
                  setLoginSlide={setLoginSlide}
                  setLoginError={setLoginError}
                  displaySuccess={(message: string) => setLoginSuccess(message)}
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
              {loginSuccess != "" && loginError === null && (
                <div className="error-container">
                  <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 30, opacity: 0 }}
                  >
                    <p className="request-success">{"" + loginSuccess}</p>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <div className="welcome-container">
        {loginSlide && (
          <div className="welcome-greeting">
            <h2>Nice to see you again</h2>
            <h1>Welcome Back</h1>
          </div>
        )}
        {!loginSlide && (
          <div className="welcome-greeting">
            <h2>Nice to meet you</h2>
            <h1>Welcome</h1>
          </div>
        )}
        <div className="welcome-image-container">
          <img src={exampleDesktop} className="welcome-image"></img>
        </div>
      </div>
    </div>
  );
}
