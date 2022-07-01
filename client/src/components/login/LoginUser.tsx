import React, { useContext } from "react";
import { Account, AccountContext } from "./Account";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import UserPool from "./UserPool";
import "../../styles/components/Login.scss";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: Function;
  displayError: Function;
}

export default function LoginUser(props: LoginProps) {
  const formSchema = Yup.object().shape({
    email: Yup.string()
      .required("This is Required")
      .email("This must be an Email"),
    password: Yup.string()
      .required("This is Required")
      .min(8, "Password should be at least 8 characters"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, watch, formState } = useForm(validationOpt);
  const { errors } = formState;
  const navigate = useNavigate();

  const { authenticate } = useContext(AccountContext);

  const onSubmit = (data: any) => {
    authenticate(data.email, data.password)
      .then((returnData: any) => {
        props.onLogin();
        console.log("Logged in!", returnData);
        navigate("/calculate");
      })
      .catch((err: any) => {
        props.displayError(err);
        console.error("Failed to login!", err);
      });
  };

  return (
    <motion.div
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }}
    >
      <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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
        <input type="submit" value="submit"></input>
      </form>
    </motion.div>
  );
}
