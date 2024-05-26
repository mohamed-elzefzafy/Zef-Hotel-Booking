import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerApi } from "../apiClient";
import { useAppContext } from "../components/contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto?: FileList;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const [profilePhotoPreview, setProfilePhotoPreview] = useState<string | null>(null);

  const mutation = useMutation(registerApi, {
    onSuccess: () => {
      showToast({ message: "Registration successful", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    if (data.profilePhoto && data.profilePhoto[0]) {
      formData.append("profilePhoto", data.profilePhoto[0]);
    }

    mutation.mutate(formData);
  });

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhotoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="flex flex-col gap-5 px-2 md:px-0" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Register</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-gray-700 font-bold text-sm flex-1">
          First Name
          <input
            type="text"
            className="rounded font-normal py-1 px-2 border w-full"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-gray-700 font-bold text-sm flex-1">
          Last Name
          <input
            type="text"
            className="rounded font-normal py-1 px-2 border w-full"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label className="text-gray-700 font-bold text-sm flex-1">
        Confirm Password
        <input
          type="password"
          className="rounded font-normal py-1 px-2 border w-full"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "Please enter your confirm password";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>

      {profilePhotoPreview && (
        <div>
          <img src={profilePhotoPreview} alt="Profile Preview" className="w-32 h-32 rounded-md object-contain" />
        </div>
      )}
      
      <label>
        Profile Photo
        {" "}
        <input type="file" {...register("profilePhoto")} onChange={handleProfilePhotoChange} />
      </label>

      <span className="flex items-center justify-between">
        <p>
          Already Registered? <Link to="/login" className="underline">Sign in here</Link>
        </p>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md hover:bg-blue-800 p-2 font-bold transition-all duration-300"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default RegisterPage;