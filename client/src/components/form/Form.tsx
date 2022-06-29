import React, { useState } from "react";
import { useForm } from "react-hook-form";

import "../../styles/components/Form.scss";

interface formProps {
  submitData: Function;
}

const Form = (props: formProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: Object) => props.submitData(values);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Initial Investment
          <input
            type="number"
            placeholder="5000"
            {...register("initInvest")}
          >
            {/* {errors.initInvest} */}
          </input>
        </label>
        <label>
          Years to Accumulate
          <input
            type="number"
            placeholder="5000"
            {...register("yearsToAccum")}
          ></input>
        </label>
        <label>
          Rate of Return
          <input
            type="number"
            placeholder="5000"
            {...register("rateOfReturn")}
          ></input>
        </label>
        <label>
          Additional Contribution
          <input
            type="number"
            placeholder="5000"
            {...register("addContr")}
          ></input>
        </label>
        <label>
          Contribute Each
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
