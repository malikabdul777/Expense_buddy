// React
import { useState } from "react";

// Thirdparty
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import Lottie from "react-lottie";
import animationData from "./signup_animation.json";

// Utils

// APISlices
import { useCreateUserMutation } from "@/store/apiSlices/childApiSlices/signUpApiSlice";

// Slice

// CustomHooks

// Components
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/TextField/TextField";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./SignUp.module.css";

// Local enums

// Local constants

// Local Interfaces

// Form Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().required("Email is required!"),
  password: yup.string().required("Password is required!"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [passwordFieldType, setPasswordFieldType] = useState("password");
  const [confirmPasswordFieldType, setConfirmPasswordFieldType] =
    useState("password");

  const [createUser, { isLoading }] = useCreateUserMutation();

  const formSubmitHandler = async (data) => {
    const response = await createUser({
      name: data.name,
      email: data.email,
      password: data.password,
    });

    console.log(response);

    if (response.data) {
      // Show Toast
      toast.success("Account created Successfully", {
        position: "bottom-center",
      });
    } else {
      // Show Toast
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }

    console.log(data);
  };

  const navigate = useNavigate();

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
        <h2 className={styles.formHeading}>Create your account</h2>
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit(formSubmitHandler)}>
            <TextField
              errors={errors}
              register={register}
              placeholder="Name"
              name="name"
            />
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
            <TextField
              errors={errors}
              register={register}
              placeholder="Confirm your password"
              name="passwordConfirmation"
              type={confirmPasswordFieldType}
              endIcon="true"
              icon="password"
              onEndIconClick={() => {
                setConfirmPasswordFieldType(
                  confirmPasswordFieldType === "password" ? "text" : "password"
                );
                return confirmPasswordFieldType;
              }}
            />
            <Button
              type="submit"
              className={styles.signUpButton}
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </form>
        </div>
        <p className={styles.loginLinkText}>
          Already have an account?
          <span
            onClick={() => navigate("/login")}
            className={styles.loginLinkSpan}
          >
            Login now
          </span>
        </p>
      </div>
      <div className={styles.imageSection}>
        {/* <img src="./signup_image.svg" alt="logo" className={styles.image} /> */}

        <Lottie options={defaultLottieOptions} height={400} width={400} />
      </div>
    </div>
  );
};

export default SignUp;
