import ReactDOM from "react-dom";
import { AuthModalsProps, LoginFormData } from "../utils/types";
import { useForm } from "react-hook-form";
import LoadingSpinner from "./LoadingSpinner";
import { faXmark, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
    console.log(data);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { isSubmitting, errors } = formState;
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
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit__button--login"
            >
              {isSubmitting ? <LoadingSpinner /> : "Login"}
            </button>
          </div>
        </form>
      </div>
    </>,
    document.getElementById("portal") as HTMLElement
  );
};

export default LoginModal;
