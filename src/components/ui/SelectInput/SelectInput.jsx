// React

// Thirdparty
// import Select from "react-select";
// import { Controller, useController } from "react-hook-form";
import { IoMdAdd, IoIosAddCircle } from "react-icons/io";

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
import { Button } from "../button";
import AddAccountModal from "@/components/AddAccountModal/AddAccountModal";
import { useState } from "react";
import AddCategoryModal from "@/components/AddCategoryModal/AddCategoryModal";

// Local enums

// Local constants

// Local Interfaces

const SelectInput = (props) => {
  const {
    register,
    name,
    errors,
    options,
    disabled = false,
    noOptions = {},
  } = props;

  const [showAddAccountModal, setShowAddAccountModal] = useState(false);
  const onAddAccountModalClose = () => setShowAddAccountModal(false);

  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const onAddCategoryModalClose = () => setShowAddCategoryModal(false);

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
      <AddAccountModal
        open={showAddAccountModal}
        onCloseModal={onAddAccountModalClose}
      />
      <AddCategoryModal
        open={showAddCategoryModal}
        onCloseModal={onAddCategoryModalClose}
      />

      {options.length !== 0 && (
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
      )}
      {options.length === 0 && (
        <div className={styles.noOptionsContainer}>
          <p className={styles.noOptionsText}>{noOptions.errorMessage}</p>
          {name === "account" && (
            <Button
              variant="default"
              onClick={() => setShowAddAccountModal(true)}
              className={styles.addAccountButton}
              type="button"
            >
              <IoMdAdd size={20} />
            </Button>
          )}
          {name === "category" && (
            <Button
              variant="default"
              onClick={() => setShowAddCategoryModal(true)}
              className={styles.addAccountButton}
              type="button"
            >
              <IoMdAdd size={20} />
            </Button>
          )}
        </div>
      )}
      {name === "category" && !disabled && options.length !== 0 && (
        <IoIosAddCircle
          size={24}
          className={styles.addIcon}
          onClick={() => setShowAddCategoryModal(true)}
        />
      )}
      {name === "account" && !disabled && options.length !== 0 && (
        <IoIosAddCircle
          size={24}
          className={styles.addIcon}
          onClick={() => setShowAddAccountModal(true)}
        />
      )}

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
