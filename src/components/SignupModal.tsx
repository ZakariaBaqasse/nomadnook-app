import ReactDOM from "react-dom";
import { AuthModalsProps, SignupFormData } from "../utils/types";
import { useForm } from "react-hook-form";
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignUpEmailPassword } from "@nhost/react";
import { Navigate } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";

const schema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required()
    .min(6, "Password must be at least 6 characters long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match")
    .required("Please confirm your password"),
});

const SignupModal = ({ isOpen, onClose }: AuthModalsProps) => {
  const { signUpEmailPassword, isError, error, isLoading, isSuccess } =
    useSignUpEmailPassword();
  const { register, handleSubmit, formState } = useForm<SignupFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: SignupFormData) => {
    signUpEmailPassword(data.email, data.password, {
      displayName: `${data.firstName} ${data.lastName}`.trim(),
      metadata: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
    });
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
          Sign Up
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
          className="auth__form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="md:flex gap-7 mb-8 md:w-96 w-60">
            <div className="mb-8 md:mb-0">
              <input
                className="form-input"
                placeholder="First name"
                type="firstName"
                id="firstName"
                {...register("firstName")}
              />
              <p className="error">{errors.firstName?.message}</p>
            </div>
            <div className="mb-8 md:mb-0">
              <input
                className="form-input"
                placeholder="Last name"
                type="lastName"
                id="lastName"
                {...register("lastName")}
              />
              <p className="error">{errors.lastName?.message}</p>
            </div>
          </div>
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
          <div className="form-control">
            <input
              placeholder="Confirm password"
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword")}
            />
            <p className="error">{errors.confirmPassword?.message}</p>
          </div>
          <div className="w-full flex justify-center pb-3 md:pb-0">
            {isLoading ? (
              <Button>
                <Spinner
                  aria-label="Spinner button example"
                  color="info"
                  size="md"
                />
                <span className="pl-3">Loading...</span>
              </Button>
            ) : (
              <button
                type="submit"
                disabled={isLoading}
                className="submit__button--signup"
              >
                Sign Up
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

export default SignupModal;
