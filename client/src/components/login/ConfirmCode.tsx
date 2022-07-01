import React, { useContext } from "react";
import { Account, AccountContext } from "./Account";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../../styles/components/Login.scss";

interface ConfirmCodeProps {
  email: String;
  setWaitingCode: Function;
  displayError: Function;
  setLoginSlide: Function;
}

export default function ConfirmCode(props: ConfirmCodeProps) {
  const formSchema = Yup.object().shape({
    code: Yup.string().required("This is Required"),
  });

  const validationOpt = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, watch, formState } = useForm(validationOpt);
  const { errors } = formState;

  const { confirm } = useContext(AccountContext);

  const onSubmit = (data: any) => {
    console.log(data.code);
    console.log(props.email);
    confirm(props.email, data.code)
      .then((returnData: any) => {
        console.log("Code Confirmed!", returnData);
        props.setLoginSlide(true);
      })
      .catch((err: any) => {
        props.displayError(err);
        console.error("Failed to Confirm Code", err);
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
          <input
            placeholder="Insert Emailed Code to Verify"
            type="text"
            {...register("code")}
          />
          <p className="errors">
            {errors.code != undefined && "" + errors.code?.message}
          </p>
        </div>
        <input type="submit" value="submit"></input>
      </form>
    </motion.div>
  );
}
