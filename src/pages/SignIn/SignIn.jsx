// React
import { useState } from "react";

// Thirdparty
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import Lottie from "react-lottie";
import animationData from "./signIn_animation.json";

// Utils

// APISlices
import { useSignInUserMutation } from "@/store/apiSlices/childApiSlices/signInApiSlice";

// Slice
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "@/store/slices/userSlice";

// CustomHooks

// Components
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/TextField/TextField";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./SignIn.module.css";

// Local enums

// Local constants

// Local Interfaces

// Form Validation Schema
const schema = yup.object().shape({
  email: yup.string().required("Email is required!"),
  password: yup.string().required("Password is required!"),
});

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [passwordFieldType, setPasswordFieldType] = useState("password");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signInUser, { isLoading, isError }] = useSignInUserMutation();

  const formSubmitHandler = async (data) => {
    dispatch(signInStart());

    const response = await signInUser({
      email: data.email,
      password: data.password,
    });

    // console.log(response);

    if (!response.data) {
      toast.error(response?.error?.data.message || "Something went wrong", {
        position: "bottom-center",
      });
      dispatch(signInFailure());
    } else {
      navigate("/dashboard");
      dispatch(signInSuccess(response.data));
    }

    // console.log(data);
  };

  const defaultLottieOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <img src="./logo.png" alt="logo" className={styles.logo} />
        <h2 className={styles.formHeading}>Login to your account</h2>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <TextField
              errors={errors}
              register={register}
              placeholder="Email"
              name="email"
              type="email"
            />
            <TextField
              errors={errors}
              register={register}
              placeholder="Password"
              name="password"
              type={passwordFieldType}
              endIcon="true"
              icon="password"
              onEndIconClick={() => {
                setPasswordFieldType(
                  passwordFieldType === "password" ? "text" : "password"
                );

                return passwordFieldType;
              }}
            />

            <Button
              type="submit"
              className={styles.signInButton}
              disabled={isLoading}
            >
              Sign In
            </Button>
          </form>
        </div>
        <p className={styles.loginLinkText}>
          Already have an account?
          <span
            onClick={() => navigate("/signup")}
            className={styles.loginLinkSpan}
          >
            Sign Up
          </span>
        </p>
      </div>
      <div className={styles.imageSection}>
        <Lottie options={defaultLottieOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default SignIn;
