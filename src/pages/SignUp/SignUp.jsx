// React

// Thirdparty
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

import Lottie from "react-lottie";
import animationData from "./signup_animation.json";

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import TextField from "@/components/ui/TextField/TextField";
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

  const formSubmitHandler = (data) => {
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
              type="password"
            />
            <TextField
              errors={errors}
              register={register}
              placeholder="Confirm your password"
              name="passwordConfirmation"
              type="password"
            />
            <Button type="submit" className={styles.signUpButton}>
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

        <Lottie options={defaultLottieOptions} height={600} width={600} />
      </div>
    </div>
  );
};

export default SignUp;