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
import styles from "./SelectInput.module.css";

// Local enums

// Local constants

// Local Interfaces

const SelectInput = (props) => {
  const { register, name, errors, options, disabled = false } = props;
  return (
    <div className={styles.selectInputContainer}>
      <select
        {...register(name)}
        name={name}
        className={styles.selectInput}
        disabled={disabled}
      >
        {options.map((curVal, i) => (
          <option value={curVal.toLowerCase()} key={`${curVal}${i}`}>
            {curVal}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
