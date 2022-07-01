import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import UserPool from "./UserPool";
import "./Login.css";
import ConfirmCode from "./ConfirmCode";

interface LoginProps {
  onLogin: Function;
  displayError: Function;
  setLoginSlide: Function;
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
        <div className="field">
          <input placeholder="Email" type="text" {...register("email")} />
          <p className="errors">
            {errors.email != undefined && "" + errors.email?.message}
          </p>
        </div>
        <div className="field">
          <input
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <p className="errors">
            {errors.password != undefined && "" + errors.password?.message}
          </p>
        </div>
        <div className="field">
          <input
            placeholder="Confirm Password"
            type="password"
            {...register("passwordConfirm")}
          />
          <p className="errors">
            {errors.passwordConfirm != undefined &&
              "" + errors.passwordConfirm?.message}
          </p>
        </div>
        <input type="submit" value="submit"></input>
      </form>
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
