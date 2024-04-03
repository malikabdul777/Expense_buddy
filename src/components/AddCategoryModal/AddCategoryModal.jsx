// React
import { useState } from "react";

// Thirdparty
import { useForm } from "react-hook-form";
import Modal from "react-responsive-modal";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

// Utils

// APISlices
import { useCreateCategoryMutation } from "@/store/apiSlices/childApiSlices/categoryApiSlice";

// Slice

// CustomHooks

// Components
import TextField from "../ui/TextField/TextField";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./AddCategoryModal.module.css";

// Local enums

// Local constants

// Local Interfaces

const schema = yup.object().shape({
  name: yup.string().required("Title is required!"),
});

const AddCategoryModal = (props) => {
  const { open, onCloseModal } = props;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [emoji, setEmoji] = useState("😀");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const [createCategory] = useCreateCategoryMutation();

  const formSubmitHandler = async (data) => {
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
      reset();
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

    // Close Modal
    onCloseModal();
  };

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center className={styles.modal}>
        <h2 className={styles.modalHeading}>Add Category</h2>
        <form onSubmit={handleSubmit(formSubmitHandler)}>
          <div className={styles.formInputsWrapper}>
            <TextField
              errors={errors}
              register={register}
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
                    maxFrequentRows={0}
                    perLine={10}
                  />
                </div>
              )}
            </div>
          </div>
          <Button type="submit" variant="default">
            Add Account
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AddCategoryModal;
