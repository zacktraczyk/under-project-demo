import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import UserPool from "./UserPool";
import "../../styles/components/Login.scss";
import ConfirmCode from "./ConfirmCode";

interface LoginProps {
  onLogin: Function;
  displayError: Function;
  setLoginSlide: Function;
  setLoginError: Function;
}

export default function LoginUser(props: LoginProps) {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("This is Required")
      .email("This must be a email"),
    password: Yup.string()
      .required("This is Required")
      .min(8, "Password should be at least 8 characters"),
    passwordConfirm: Yup.string()
      .required("This is Required")
      .oneOf([Yup.ref("password")], "Passwords don't match ;("),
  });

  // EXAMPLE USER CONFIRMATION:
  // aws cognito-idp confirm-sign-up --client-id 16qljlmrbg2sg7rr9spuv0orsh --username ea73fd5b-ab18-4e60-b08f-3c4f051008a6 --confirmation-code 884861

  const [waitingCode, setWaitingCode] = useState(false);
  const [createdEmail, setCreatedEmail] = useState("");
  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, watch, formState } = useForm(validationOpt);
  const { errors } = formState;

  // I know this is ugly, ill move it to another file once everything is working
  const displayCreateUserForm = () => {
    return (
      <>
        <h1 className="log-in-header">Sign Up</h1>
        <h2 className="log-in-quip">
          Welcome! Please enter some account details.
        </h2>
        <form
          onSubmit={handleSubmit((data) => {
            UserPool.signUp(
              data.email,
              data.password,
              [],
              [],
              (err, returnData) => {
                if (err) {
                  props.displayError(err);
                } else {
                  props.displayError(null);
                  props.onLogin();
                  console.log(returnData);
                  setCreatedEmail(data.email);
                  setWaitingCode(true);
                }
              }
            );
          })}
        >
          <h3 className="form-labels">Email</h3>
          <div className="field">
            <input
              placeholder="Enter your email"
              type="text"
              {...register("email")}
            />
            <p className="errors">
              {errors.email != undefined && "" + errors.email?.message}
            </p>
          </div>
          <h3 className="form-labels">Password</h3>
          <div className="field">
            <input
              placeholder="Enter a password"
              type="password"
              {...register("password")}
            />
            <p className="errors">
              {errors.password != undefined && "" + errors.password?.message}
            </p>
          </div>
          <h3 className="form-labels">Confirm Password</h3>
          <div className="field">
            <input
              placeholder="Confirm entered Password"
              type="password"
              {...register("passwordConfirm")}
            />
            <p className="errors">
              {errors.passwordConfirm != undefined &&
                "" + errors.passwordConfirm?.message}
            </p>
          </div>
          <input type="submit" value="Sign Up"></input>
        </form>
        <div className="sign-up-toggle-holder">
          <h1 className="sign-up-text">Already have an Account?</h1>
          <h1
            className="sign-up-link"
            onClick={() => {
              props.setLoginSlide(true);
              props.setLoginError(null);
            }}
          >
            Log in!
          </h1>
        </div>
      </>
    );
  };
  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
    >
      {!waitingCode && displayCreateUserForm()}
      {waitingCode && (
        <ConfirmCode
          email={createdEmail}
          setWaitingCode={setWaitingCode}
          displayError={props.displayError}
          setLoginSlide={props.setLoginSlide}
        />
      )}
    </motion.div>
  );
}
