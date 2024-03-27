// React
import { useEffect, useState } from "react";

// Thirdparty
import { BiDollar } from "react-icons/bi";

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
    type = `text`,
    disabled = false,
  } = props;

  const [errorMessage, setErrorMessage] = useState(
    errors[`${name}`]?.message || "Error here"
  );

  useEffect(() => {
    setErrorMessage(errors[`${name}`]?.message || "Error here");
  }, [errors[`${name}`]]);

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
