import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface formData {
  description: string;
  amount: number;
  category: string;
}

function Form() {
  // npm install react-hook-form
  const {
    // destructure the useForm object to get register, handleSublmit and formState
    register,
    handleSubmit,
    // destructure this further to get the errors
    formState: { errors },
  } = useForm<formData>();

  const [categories /* setCategories */] = useState<string[]>([
    "groceries",
    "utilities",
    "entertainment",
  ]);
  // const categories = ["groceries", "utilities", "entertainment"]

  function capitalizeFirstLetter(str: string) {
    if (!str) return ""; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function onSubmit(data: FieldValues) {
    console.log(data);
  }

  return (
    <>
      <h3 className="mt-1">Add an Expense</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description", {
              required: true,
              minLength: 3,
            })}
            id="description"
            type="text"
            className="form-control"
          />
          {/* handle errors */}
          {errors.description?.type === "required" && (
            <p className="text-danger">this field is required</p>
          )}
          {errors.description?.type === "minLength" && (
            <p className="text-danger">name must be more than 3 characters</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", {
              required: true,
              min: 1,
            })}
            id="amount"
            type="number"
            className="form-control"
          />
          {/* handle errors */}
          {errors.description?.type === "required" && (
            <p className="text-danger">this field is required</p>
          )}
          {errors.amount?.type === "min" && (
            <p className="text-danger">
              amount should be atleast more than 1 pound
            </p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category", {
              required: true,
            })}
            id="category"
            className="form-select"
            defaultValue=""
          >
            <option value="" disabled>
              choose a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {capitalizeFirstLetter(category)}
              </option>
            ))}
          </select>
          {/* handle errors */}
          {errors.category?.type === "required" && (
            <p className="text-danger">this field is required</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default Form;
