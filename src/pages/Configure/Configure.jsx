// React

// Thirdparty
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// Utils

// APISlices
import {
  useCreateAccountMutation,
  useDeleteAccountMutation,
  useGetAllAccountsQuery,
} from "@/store/apiSlices/childApiSlices/accountsApiSlice";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/store/apiSlices/childApiSlices/categoryApiSlice";

// Slice

// CustomHooks

// Components
import { Button } from "@/components/ui/button";
import TextWithEllipsis from "@/components/ui/TextWithEllipsis/TextWithEllipsis";
import TextField from "@/components/ui/TextField/TextField";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./Configure.module.css";
import { useState } from "react";

// Local enums

// Local constants

// Local Interfaces

// Form Validation Schema
// Account Schema
const accountsSchema = yup.object().shape({
  name: yup.string().required("Account name is required!"),
});

// Category Schema
const categoriesSchema = yup.object().shape({
  name: yup.string().required("Category name is required!"),
});
const Configure = () => {
  const [emoji, setEmoji] = useState("😀");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const {
    register: registerAccount,
    handleSubmit: handleSubmitAccount,
    reset: resetAccount,
    formState: { errors: errorsAccount },
  } = useForm({ resolver: yupResolver(accountsSchema) });

  const {
    register: registerCategory,
    handleSubmit: handleSubmitCategory,
    reset: resetCategory,
    formState: { errors: errorsCategory },
  } = useForm({ resolver: yupResolver(categoriesSchema) });

  // Account API Slices
  const { data: accountsData } = useGetAllAccountsQuery();
  const [createAccount] = useCreateAccountMutation();
  const [deleteAccount] = useDeleteAccountMutation();

  // Category API Slices
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // console.log(categoriesData);
  const accountFormSubmitHandler = async (data) => {
    // API Call
    const response = await createAccount(data);

    // Show Toast
    if (response.data) {
      // Show Toast
      toast.success("Account Added Successfully", {
        position: "bottom-center",
      });

      // Reset Form
      resetAccount();
    } else {
      // Show Toast
      toast.error(
        response?.error?.data.message.code === 11000
          ? "Account Name Already Exists"
          : `Something went wrong` || "Something went wrong",
        {
          position: "bottom-center",
        }
      );
    }
  };

  const categoryFormSubmitHandler = async (data) => {
    const categoryData = {
      name: data.name,
      emoji,
    };
    // API Call
    const response = await createCategory(categoryData);

    // Show Toast
    if (response.data) {
      // Show Toast
      toast.success("Account Added Successfully", {
        position: "bottom-center",
      });

      // Reset Form
      resetCategory();
    } else {
      // Show Toast
      toast.error(
        response?.error?.data.message.code === 11000
          ? "Category Already Exists"
          : `Something went wrong` || "Something went wrong",
        {
          position: "bottom-center",
        }
      );
    }
  };

  const accountDeleteHandler = async (accountId) => {
    const response = await deleteAccount(accountId);

    // console.log(response);

    // Show Toast
    if (response.data) {
      // Show Toast
      toast.success("Account Deleted Successfully", {
        position: "bottom-center",
      });

      // Reset Form
      resetAccount();
    } else {
      // Show Toast
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }
  };

  const categoryDeleteHandler = async (categoryId) => {
    const response = await deleteCategory(categoryId);

    // Show Toast
    if (response.data) {
      // Show Toast
      toast.success("Account Deleted Successfully", {
        position: "bottom-center",
      });

      // Reset Form
      resetAccount();
    } else {
      // Show Toast
      toast.error("Something went wrong", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className={styles.configureContainer}>
      <div className={styles.accountsContainer}>
        <h2 className={styles.accountsHeading}>Accounts</h2>
        <form onSubmit={handleSubmitAccount(accountFormSubmitHandler)}>
          <div className={styles.textFieldContainer}>
            <TextField
              errors={errorsAccount}
              register={registerAccount}
              placeholder="Account Name"
              name="name"
            />
            <Button className={styles.addButton} type="submit">
              Add
            </Button>
          </div>
        </form>
        <div>
          <h2 className={styles.accountSubHeading}>Existing Accounts</h2>
          <div>
            {accountsData?.data?.accounts.length !== 0 &&
              accountsData?.data?.accounts.map((account) => (
                <div className={styles.accountCard} key={account._id}>
                  <TextWithEllipsis maxLength={15}>
                    {account.name}
                  </TextWithEllipsis>
                  <MdDeleteForever
                    size={20}
                    className={styles.deleteIcon}
                    onClick={() => accountDeleteHandler(account._id)}
                  />
                </div>
              ))}
            {accountsData?.data?.accounts.length === 0 && (
              <p className={styles.noCategoryText}>
                No Accounts Found, Add accounts above!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Categories Container */}
      <div className={styles.categoryContainer}>
        <h2 className={styles.accountsHeading}>Categories</h2>
        <form onSubmit={handleSubmitCategory(categoryFormSubmitHandler)}>
          <div className={styles.textFieldContainer}>
            <TextField
              errors={errorsCategory}
              register={registerCategory}
              placeholder="Category Name"
              name="name"
            />
            <div className={styles.emojiContainerWrapper}>
              <div
                className={styles.emojiContainer}
                onClick={() => setShowEmojiPicker((prevState) => !prevState)}
              >
                <p>{emoji}</p>
              </div>
              {showEmojiPicker && (
                <div className={styles.emojiPickerContainer}>
                  <Picker
                    data={data}
                    onEmojiSelect={(data) => {
                      setEmoji(data.native);
                      setShowEmojiPicker(false);
                    }}
                    previewPosition="none"
                    theme="light"
                    maxFrequentRows={1}
                  />
                </div>
              )}
            </div>
            <Button className={styles.addButton} type="submit">
              Add
            </Button>
          </div>
        </form>
        <div>
          <h2 className={styles.accountSubHeading}>Existing Categories</h2>
          <div>
            {categoriesData?.data?.categories.length !== 0 &&
              categoriesData?.data?.categories.map((category) => (
                <div className={styles.accountCard} key={category._id}>
                  <div className={styles.categoryDetails}>
                    <p className={styles.categoryDetailsEmoji}>
                      {category.emoji}
                    </p>
                    <TextWithEllipsis maxLength={15}>
                      {category.name}
                    </TextWithEllipsis>
                  </div>
                  <MdDeleteForever
                    size={20}
                    className={styles.deleteIcon}
                    onClick={() => categoryDeleteHandler(category._id)}
                  />
                </div>
              ))}
            {categoriesData?.data?.categories.length === 0 && (
              <p className={styles.noCategoryText}>
                No Categories Found, Add categories above!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configure;
