import ReactDOM from "react-dom";
import { AuthModalsProps, LoginFormData } from "../utils/types";
import { useForm } from "react-hook-form";
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignInEmailPassword } from "@nhost/react";
import { Navigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";

const schema = yup.object({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required()
    .min(6, "Password must be at least 6 characters long"),
});

const LoginModal = ({ isOpen, onClose }: AuthModalsProps) => {
  const { signInEmailPassword, isLoading, isSuccess, isError, error } =
    useSignInEmailPassword();
  const { register, handleSubmit, formState } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data: LoginFormData) => {
    signInEmailPassword(data.email, data.password);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { errors } = formState;
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <>
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="authmodal__container">
        <h1 className="text-center font-primary text-4xl my-10 md:my-6 font-semibold text-primary">
          Login
        </h1>
        <div className="absolute right-4 top-4" onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} className="text-2xl" />
        </div>
        {isError && (
          <div className="error text-center">
            <p>{error?.message}</p>
          </div>
        )}
        <form
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-control">
            <input
              placeholder="Email"
              type="email"
              id="email"
              {...register("email")}
            />
            <p className="error">{errors.email?.message}</p>
          </div>
          <div className="form-control relative">
            <div
              onClick={handleShowPassword}
              className="absolute right-1 top-1/2 -translate-y-1/2"
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
            </div>
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password")}
            />
            <p className="error">{errors.password?.message}</p>
          </div>
          <div className="w-full flex justify-center">
            {isLoading ? (
              <Button>
                <Spinner aria-label="Spinner button example" />
                <span className="pl-3">Loading...</span>
              </Button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="submit__button--login"
              >
                Login
              </button>
            )}
          </div>
        </form>
      </div>
      {isSuccess && <Navigate to="/dashboard" />}
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default LoginModal;
