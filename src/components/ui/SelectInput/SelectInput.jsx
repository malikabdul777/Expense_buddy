// React

// Thirdparty
import Select from "react-select";
import { Controller, useController } from "react-hook-form";
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
  const { register, name, errors, options, disabled = false, control } = props;

  // Set the first option as default value
  const defaultValue = options.length > 0 ? options[0].toLowerCase() : "";

  // const { field } = useController({ name, control });

  // const transformedOptions = options.map((option) => ({
  //   value: option.toLowerCase(),
  //   label: option.charAt(0).toUpperCase() + option.slice(1),
  // }));

  // const handleChange = (selectedOption) => {
  //   const selectedValue = selectedOption ? String(selectedOption.value) : "";
  //   field.onChange(selectedValue);
  // };

  return (
    <div className={styles.selectInputContainer}>
      <select
        {...register(name)}
        name={name}
        className={styles.selectInput}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        {options.map((curVal, i) => (
          <option value={curVal.toLowerCase()} key={`${curVal}${i}`}>
            {curVal}
          </option>
        ))}
      </select>

      {/* <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Select
            {...field}
            defaultValue={defaultValue}
            options={transformedOptions}
            onChange={handleChange}
            value={transformedOptions.find(
              (option) => option.value === field.value
            )}
          />
        )}
      /> */}
    </div>
  );
};

export default SelectInput;
