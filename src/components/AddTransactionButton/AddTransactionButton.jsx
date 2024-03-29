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
import { useCreateTransactionMutation } from "@/store/apiSlices/childApiSlices/transactionsApiSlice";
import { useGetAllAccountsQuery } from "@/store/apiSlices/childApiSlices/accountsApiSlice";
import { useGetAllCategoriesQuery } from "@/store/apiSlices/childApiSlices/categoryApiSlice";

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
  title: yup.string().required("Title is required!"),
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
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // API Slices
  const [createTransaction] = useCreateTransactionMutation();
  const { data: accountsData } = useGetAllAccountsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery();

  const formSubmitHandler = async (data) => {
    // Create Transaction
    const response = await createTransaction(data);

    if (response.data) {
      // Show Toast
      toast.success("Transaction Added Successfully", {
        position: "bottom-center",
      });

      // Reset Form
      reset();
    } else {
      // Show Toast
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }
    // Close Modal
    onCloseModal();
  };

  const transactionsTypesArray = ["Income", "Expense"];
  const categoriesArray = categoriesData?.data.categories.map(
    (category) => category.name
  );
  const accountsArray = accountsData?.data.accounts.map(
    (account) => account.name
  );

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
                      control={control}
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
                      control={control}
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
                      control={control}
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
