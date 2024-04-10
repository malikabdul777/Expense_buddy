// React
import { useEffect, useState } from "react";

// Thirdparty
import { BiDollar } from "react-icons/bi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./TextField.module.css";

// Local enums

// Local constants

// Local Interfaces

const TextField = (props) => {
  const {
    register,
    placeholder,
    name,
    errors,
    endIcon,
    icon,
    onEndIconClick = () => {},
    type = `text`,
    disabled = false,
  } = props;

  const [errorMessage, setErrorMessage] = useState(
    errors[`${name}`]?.message || "Error here"
  );

  useEffect(() => {
    setErrorMessage(errors[`${name}`]?.message || "Error here");
  }, [errors[`${name}`]]);

  const [passwordHidden, setPasswordHidden] = useState(true);

  const handleEndIconClick = () => {
    const passwordFieldType = onEndIconClick();

    setPasswordHidden(passwordFieldType === "password" ? false : true);

    // console.log(passwordFieldType);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} `}>
        <input
          {...register(name)}
          placeholder={placeholder}
          className={[styles.textField]}
          type={type}
          disabled={disabled}
          step={type === "number" ? 0.01 : null}
        />
        <div className={styles.endIcon}>
          {endIcon && icon === "dollar" ? <BiDollar size={18} /> : ""}
          {endIcon && icon === "password" ? (
            passwordHidden === true ? (
              <FaRegEye
                size={16}
                className={styles.passwordEndIcon}
                onClick={handleEndIconClick}
              />
            ) : (
              <FaRegEyeSlash
                size={17}
                className={styles.passwordEndIcon}
                onClick={handleEndIconClick}
              />
            )
          ) : (
            ""
          )}
        </div>
      </div>
      <div>
        <p
          className={`${styles.errorMsg} ${
            errors[`${name}`]?.message ? "visible" : "visibilityNone"
          }`}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  );
};

export default TextField;
