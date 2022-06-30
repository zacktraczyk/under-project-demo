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
      <h1>Investment Calculator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          <p className="field-title">Initial Investment</p>
          <input
            type="number"
            placeholder="5000"
            {...register("initInvest", {
              required: "This field is required",
            })}
          />
          {errors.initInvest && (
            <p className="error">{"" + errors.initInvest.message}</p>
          )}
        </label>
        <label>
          <p className="field-title">Years to Accumulate</p>
          <input
            type="number"
            placeholder="5000"
            {...register("yearsToAccum", {
              required: "This field is required",
            })}
          />
          {errors.yearsToAccum && (
            <p className="error">{"" + errors.yearsToAccum.message}</p>
          )}
        </label>
        <label>
          <p className="field-title">Rate of Return</p>
          <input
            type="number"
            placeholder="5000"
            {...register("rateOfReturn", {
              required: "This field is required",
            })}
          />
          {errors.rateOfReturn && (
            <p className="error">{"" + errors.rateOfReturn.message}</p>
          )}
        </label>
        <label>
          <p className="field-title">Additional Contribution</p>
          <input type="number" placeholder="5000" {...register("addContr")} />
          {errors.rateOfReturn && (
            <p className="error">{"" + errors.rateOfReturn.message}</p>
          )}
        </label>
        <label>
          <p className="field-title">Contribute Each</p>
          <div className="button-container">
            {/* <label htmlFor="monthRadio">
              Month
            </label> */}
            <input
              type="radio"
              id="monthRadio"
              value="month"
              {...register("contrEach")}
            />
              <input type="radio" value="quarter" {...register("contrEach")} />
            <input type="radio" value="year" {...register("contrEach")} />
          </div>
        </label>
        <button type="submit">Calculate End Amount</button>
      </form>
    </div>
  );
};

export default Form;
