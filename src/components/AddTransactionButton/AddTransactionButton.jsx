// React
import { useState } from "react";

// Thirdparty
import { IoMdAdd } from "react-icons/io";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

// Utils

// APISlices

// Slice

// CustomHooks

// Components
import SelectInput from "../ui/SelectInput/SelectInput";
import TextArea from "../ui/TextArea/TextArea";
import { Button } from "@/components/ui/button";
import TextField from "../ui/TextField/TextField";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./AddTransactionButton.module.css";
import "./addTransactionModal.css";

// Local enums

// Local constants

// Local Interfaces

// Form Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  amount: yup
    .number()
    .typeError("Amount is required!")
    .positive("Please enter a positive value")
    .required("Amount is required!"),
  date: yup.date().typeError("Date is required!").required("Date is required!"),
  type: yup.string().required(),
  category: yup.string().required(),
  account: yup.string().required(),
  notes: yup.string(),
});

const AddTransactionButton = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const formSubmitHandler = (data) => {
    console.log(data);

    // Show Toast
    toast.success("Transaction Added Successfully", {
      position: "bottom-center",
    });

    // Reset Form
    reset();

    // Close Modal
    onCloseModal();
  };

  const transactionsTypesArray = ["Credit", "Debit"];
  const categoriesArray = ["Health", "Utilities", "Food"];
  const accountsArray = ["Debit card", "Credit card", "Costco card"];
  // console.log("ett");
  return (
    <div className={styles.container}>
      <div className={styles.addButtonContainer} onClick={onOpenModal}>
        <IoMdAdd size={25} color="white" />
      </div>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        className={`${styles.modalContainer} addTransactionModalContainer`}
      >
        <h2 className={styles.modalHeading}>Add Transaction</h2>
        <div>
          <div>
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
                placeholder="Amount"
                name="amount"
                icon="dollar"
                endIcon={true}
                type="number"
              />
              <div className={styles.selectorsContainer}>
                <div className={styles.modalHalfSizeLeftInputContainer}>
                  <p className={styles.inputLabel}>Date</p>
                  <TextField
                    errors={errors}
                    register={register}
                    name="date"
                    type="datetime-local"
                  />
                </div>
                <div className={styles.modalHalfSizeRightInputContainer}>
                  <div className={styles.selectInputWrapper}>
                    <p className={styles.inputLabel}>Payment type</p>
                    <SelectInput
                      register={register}
                      name="type"
                      errors={errors}
                      options={transactionsTypesArray}
                    ></SelectInput>
                  </div>
                </div>
              </div>
              <div className={styles.selectorsContainer}>
                <div className={styles.modalHalfSizeLeftInputContainer}>
                  <div className={styles.selectInputWrapper}>
                    <p className={styles.inputLabel}>Category</p>
                    <SelectInput
                      register={register}
                      name="category"
                      errors={errors}
                      options={categoriesArray}
                    ></SelectInput>
                  </div>
                </div>
                <div className={styles.modalHalfSizeRightInputContainer}>
                  <div className={styles.selectInputWrapper}>
                    <p className={styles.inputLabel}>Account</p>
                    <SelectInput
                      register={register}
                      name="account"
                      errors={errors}
                      options={accountsArray}
                    ></SelectInput>
                  </div>
                </div>
              </div>
              <TextArea
                errors={errors}
                register={register}
                name="notes"
                placeholder="Write your notes here"
              />
              <Button type="submit" variant="default">
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AddTransactionButton;
