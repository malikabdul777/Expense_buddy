// React
import { useEffect, useState } from "react";

// Thirdparty
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Utils

// APISlices
import { useGetAllAccountsQuery } from "@/store/apiSlices/childApiSlices/accountsApiSlice";
import { useGetAllCategoriesQuery } from "@/store/apiSlices/childApiSlices/categoryApiSlice";

// Slice

// CustomHooks

// Components
import SelectInput from "../ui/SelectInput/SelectInput";
import TextArea from "../ui/TextArea/TextArea";
import TextField from "../ui/TextField/TextField";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./ViewTransactionModal.module.css";
import "./viewTransactionModal.css";
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

const ViewTransactionModal = (props) => {
  const { open, setOpen, data } = props;
  const {
    register,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onCloseModal = () => setOpen(false);
  // console.log(data);

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

  // API Slices
  const { data: accountsData } = useGetAllAccountsQuery();
  const { data: categoriesData } = useGetAllCategoriesQuery();

  const transactionsTypesArray = ["Income", "Expense"];
  const categoriesArray = categoriesData?.data.categories.map(
    (category) => category.name
  );
  const accountsArray = accountsData?.data.accounts.map(
    (account) => account.name
  );

  return (
    <div className={styles.container}>
      <Modal
        open={open}
        onClose={onCloseModal}
        center
        className={`${styles.modalContainer} addTransactionModalContainer`}
      >
        <h2 className={styles.modalHeading}>Transaction Details</h2>
        <div>
          <div>
            <form>
              <TextField
                errors={errors}
                register={register}
                placeholder="Title"
                name="title"
                disabled={true}
              />
              <TextField
                errors={errors}
                register={register}
                placeholder="Amount"
                name="amount"
                icon="dollar"
                endIcon={true}
                type="number"
                disabled={true}
              />
              <div className={styles.selectorsContainer}>
                <div className={styles.modalHalfSizeLeftInputContainer}>
                  <p className={styles.inputLabel}>Date</p>
                  <TextField
                    errors={errors}
                    register={register}
                    name="createdAt"
                    type="datetime-local"
                    disabled={true}
                  />
                </div>
                <div className={styles.modalHalfSizeRightInputContainer}>
                  <div className={styles.selectInputWrapper}>
                    <p className={styles.inputLabel}>Payment type</p>
                    <SelectInput
                      errors={errors}
                      register={register}
                      name="type"
                      options={transactionsTypesArray}
                      disabled={true}
                    ></SelectInput>
                  </div>
                </div>
              </div>
              <div className={styles.selectorsContainer}>
                <div className={styles.modalHalfSizeLeftInputContainer}>
                  <div className={styles.selectInputWrapper}>
                    <p className={styles.inputLabel}>Category</p>
                    <SelectInput
                      errors={errors}
                      register={register}
                      name="category"
                      options={categoriesArray}
                      disabled={true}
                    ></SelectInput>
                  </div>
                </div>
                <div className={styles.modalHalfSizeRightInputContainer}>
                  <div className={styles.selectInputWrapper}>
                    <p className={styles.inputLabel}>Account</p>
                    <SelectInput
                      errors={errors}
                      register={register}
                      name="account"
                      options={accountsArray}
                      disabled={true}
                    ></SelectInput>
                  </div>
                </div>
              </div>
              <TextArea
                errors={errors}
                register={register}
                name="notes"
                placeholder="No transaction notes available!"
                disabled={true}
              />
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ViewTransactionModal;
