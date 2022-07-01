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

  console.log(loginError);

  return (
    <div className="login-page-container">
      <div className="login">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
        >
          {/* <ol>
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
          </ol> */}

          <div className="slider-container">
            <AnimatePresence>
              {loginSlide && (
                <LoginUser
                  onLogin={props.onSubmission}
                  displayError={(error: Error) => setLoginError(error)}
                  setLoginSlide={setLoginSlide}
                  setLoginError={setLoginError}
                />
              )}
              {!loginSlide && (
                <CreateUser
                  onLogin={props.onSubmission}
                  displayError={(error: Error) => setLoginError(error)}
                  setLoginSlide={setLoginSlide}
                  setLoginError={setLoginError}
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
