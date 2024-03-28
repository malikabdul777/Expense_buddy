// React

// Thirdparty
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import TextField from "@/components/ui/TextField/TextField";
import styles from "./Accounts.module.css";
import { Button } from "@/components/ui/button";
import {
  useCreateAccountMutation,
  useGetAllAccountsQuery,
} from "@/store/apiSlices/childApiSlices/accountsApiSlice";
import { toast } from "react-toastify";

// Local enums

// Local constants

// Local Interfaces

// Form Validation Schema
const schema = yup.object().shape({
  name: yup.string().required("Account name is required!"),
});
const Accounts = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [createAccount] = useCreateAccountMutation();

  const { data: accountsData } = useGetAllAccountsQuery();
  // console.log(accountsData.data.accounts);

  const formSubmitHandler = async (data) => {
    // API Call
    const response = await createAccount(data);

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
          ? "Account Name Already Exists"
          : `Something went wrong` || "Something went wrong",
        {
          position: "bottom-center",
        }
      );
    }
  };

  return (
    <div className={styles.accountsContainer}>
      <h2 className={styles.accountsHeading}>Accounts</h2>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <div className={styles.textFieldContainer}>
          <TextField
            errors={errors}
            register={register}
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
        {accountsData?.data?.accounts.map((account) => (
          <div className={styles.accountCard} key={account._id}>
            <p>{account.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Accounts;
