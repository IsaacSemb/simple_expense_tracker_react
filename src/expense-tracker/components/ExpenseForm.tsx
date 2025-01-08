import { useForm } from "react-hook-form";
// import singleExpenseObject from "../interfaces/singleExpenseObject";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import categories from "../categories";

const zod_schema = z.object({
  description: z
    .string()
    .min(3, { message: "Desription should be atleast 3 characters long" })
    .max(100),
  amount: z
    .number({ invalid_type_error: "Amount is required!" })
    .min(0.01, { message: "lowest amount is 0.01" })
    .max(100_000, { message: "max amount is 100,000" }),
  category: z.enum(categories, {
    errorMap: () => ({
      message: "Category is required!",
    }),
  }),
});

type ExpenseFormData = z.infer<typeof zod_schema>;

interface tableProps {
  onSubmitPressed: (data: ExpenseFormData) => void;
}

function ExpenseForm({ onSubmitPressed }: tableProps) {
  // npm install react-hook-form
  const {
    // destructure the useForm object to get register, handleSublmit and formState
    register,
    handleSubmit,
    // destructure this further to get the errors
    formState: { errors },
    // reset the entire form
    reset,
  } = useForm<ExpenseFormData>({ resolver: zodResolver(zod_schema) });

  function capitalizeFirstLetter(str: string) {
    if (!str) return ""; // Handle empty strings
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <h3 className="mt-5">Summary of Expenses</h3>

      <form
        onSubmit={handleSubmit((data) => {
          reset();
          onSubmitPressed(data);
        })}
      >
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          />
          {/* handle errors */}
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            id="category"
            className="form-select"
            defaultValue=""
          >
            <option value="" disabled>
              choose a category
            </option>
            {categories.map((category: string) => (
              <option key={category} value={category}>
                {capitalizeFirstLetter(category)}
              </option>
            ))}
          </select>
          {/* handle errors */}
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
export default ExpenseForm;
