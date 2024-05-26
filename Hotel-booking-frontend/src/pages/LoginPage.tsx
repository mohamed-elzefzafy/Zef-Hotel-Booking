import { useForm } from "react-hook-form"
import { useAppContext } from "../components/contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../apiClient";

export type LoginFormData = {
  email: string;
  password: string;
}
const LoginPage = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { register, watch, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const mutation = useMutation(login , {
    onSuccess : async()  => {
     console.log("Login success");
    } ,
    onError : (error : Error) => {
console.log(error);

    }
  })
  

  const onSubmit = () => {

  }

return (
  <form className="flex flex-col gap-5 px-2 md:px-0" onSubmit={onSubmit}>
    <h2 className="text-3xl font-bold">Login</h2>

    <label className="text-gray-700 font-bold text-sm flex-1">
      Email
      <input
        type="email"
        className="rounded font-normal py-1 px-2 border w-full"
        {...register("email", { required: "Email is required" })}
      />
      {errors.email && (
        <span className="text-red-500">{errors.email.message}</span>
      )}
    </label>
    <label className="text-gray-700 font-bold text-sm flex-1">
      Password
      <input
        type="password"
        className="rounded font-normal py-1 px-2 border w-full"
        {...register("password", {
          required: "Password is required",
          minLength: { value: 6, message: "Password must be at least 6 characters" },
        })}
      />
      {errors.password && (
        <span className="text-red-500">{errors.password.message}</span>
      )}
    </label>



    <span className="flex items-center justify-between gap-3">
      <p>
      You don't have account ? <Link to="/register" className="underline">Register here</Link>
      </p>
      <button
        type="submit"
        className="bg-blue-600 text-white rounded-md hover:bg-blue-800 p-2 font-bold transition-all duration-300"
      >
        Login
      </button>
    </span>
  </form>
);
}

export default LoginPage;