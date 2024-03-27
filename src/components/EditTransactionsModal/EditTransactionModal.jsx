// React
import { useEffect, useState } from "react";

// Thirdparty
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
import styles from "./EditTransactionModal.module.css";
import "./editTransactionModal.css";
import moment from "moment";

// Local enums

// Local constants

// Local Interfaces

// Form Validation Schema
const schema = yup.object().shape({
  title: yup.string().required("Name is required!"),
  amount: yup
    .number()
    .typeError("Amount is required!")
    .positive("Please enter a positive value")
    .required("Amount is required!"),
  createdAt: yup
    .date()
    .typeError("Date is required!")
    .required("Date is required!"),
  type: yup.string().required(),
  category: yup.string().required(),
  account: yup.string().required(),
  notes: yup.string(),
});

const EditTransactionModal = (props) => {
  const { open, setOpen, data } = props;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onCloseModal = () => setOpen(false);

  useEffect(() => {
    setValue("title", data.title);
    setValue("amount", data.amount);
    setValue(
      "createdAt",
      moment(data.createdAt, moment.ISO_8601).format("YYYY-MM-DDTHH:mm")
    );
    setValue("category", data.category.toLowerCase());
    setValue("account", data.account.toLowerCase());
    setValue("type", data.type.toLowerCase());
    setValue("notes", data.notes);
  }, [setValue]);

  const formSubmitHandler = (data) => {
    console.log(data);

    //Show Toast
    toast.success("Transaction Details Updated", {
      position: "bottom-center",
    });

    // Close modal
    onCloseModal();
  };
  const transactionsTypesArray = ["Credit", "Debit"];
  const categoriesArray = [
    "Health",
    "Utilities",
    "Food",
    "Entertainment",
    "Grocery",
    "Travel",
  ];
  const accountsArray = [
    "Costco card",
    "Debit card",
    "Credit card",
    "Bank account",
  ];

  return (
    <div className={styles.container}>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        className={`${styles.modalContainer} addTransactionModalContainer`}
      >
        <h2 className={styles.modalHeading}>Edit Transaction Details</h2>
        <div>
          <div>
            <form onSubmit={handleSubmit(formSubmitHandler)}>
              <TextField
                errors={errors}
                register={register}
                placeholder="Title"
                name="title"
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
                    name="createdAt"
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
                Update
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditTransactionModal;
