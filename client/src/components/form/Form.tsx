import { useState } from "react";
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

  const [contrEach, setContrEach] = useState("month");

  // more specific type needed
  const onSubmit = (values: any) => {
    values["contrEach"] = contrEach;
    props.submitData(values);
  };

  return (
    <div className="form-container">
      <h1>Investment Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p className="field-title">Initial Investment</p>
          <span className="input-wrapper currency">
            $
            <input
              type="number"
              placeholder="5000"
              {...register("initInvest", {
                required: "This field is required",
              })}
            />
          </span>
          {errors.initInvest && (
            <p className="error">{"" + errors.initInvest.message}</p>
          )}
        </label>
        <label>
          <p className="field-title">Years to Accumulate</p>
          <span className="input-wrapper">
          <input
            type="number"
            placeholder="5"
            {...register("yearsToAccum", {
              required: "This field is required",
            })}
          />
          </span>
          {errors.yearsToAccum && (
            <p className="error">{"" + errors.yearsToAccum.message}</p>
          )}
        </label>
        <label>
          <p className="field-title">Rate of Return</p>
          <span className="input-wrapper percentage">
          <input
            type="number"
            placeholder="6"
            {...register("rateOfReturn", {
              required: "This field is required",
            })}
          />
          %
          </span>
          {errors.rateOfReturn && (
            <p className="error">{"" + errors.rateOfReturn.message}</p>
          )}
        </label>
        <label>
          <p className="field-title">Additional Contribution</p>
          <span className="input-wrapper">
            $
            <input type="number" placeholder="100" {...register("addContr")} />
          </span>
          {errors.rateOfReturn && (
            <p className="error">{"" + errors.rateOfReturn.message}</p>
          )}
        </label>

        <label>
          <p className="field-title">Contribute Each</p>
          <div className="button-container">
            <button
              className={contrEach === "month" ? "selected" : ""}
              type="button"
              value="month"
              onClick={() => setContrEach("month")}
            >
              Month
            </button>
            <button
              className={contrEach === "quarter" ? "selected" : ""}
              type="button"
              value="quarter"
              onClick={() => setContrEach("quarter")}
            >
              Quarter
            </button>
            <button
              className={contrEach === "year" ? "selected" : ""}
              type="button"
              value="year"
              onClick={() => setContrEach("year")}
            >
              Year
            </button>
          </div>
        </label>
        <button type="submit">Calculate End Amount</button>
      </form>
    </div>
  );
};

export default Form;
