// React

// Thirdparty

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./TextArea.module.css";

// Local enums

// Local constants

// Local Interfaces

const TextArea = (props) => {
  const { register, name, errors, placeholder, disabled = false } = props;

  return (
    <div className={styles.selectInputContainer}>
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className={styles.textArea}
        disabled={disabled}
      />
    </div>
  );
};

export default TextArea;
