// React
import { useEffect, useState } from "react";

// Thirdparty
import { addDays } from "date-fns";
import moment from "moment";
import EBDateRangePicker from "../EBDateRangePicker/EBDateRangePicker";
import Select from "react-select";

// Utils

// APISlices
import { useGetAllCategoriesQuery } from "@/store/apiSlices/childApiSlices/categoryApiSlice";
import { useGetAllAccountsQuery } from "@/store/apiSlices/childApiSlices/accountsApiSlice";

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./TransactionsFilterSideBar.module.css";
import { Button } from "../ui/button";

// Local enums

// Local constants

// Local Interfaces

const TransactionsFilterSideBar = (props) => {
  const { setFilteredData, data } = props;

  // console.log(data);

  // API CallS
  const { data: categoriesData } = useGetAllCategoriesQuery();
  const { data: accountData } = useGetAllAccountsQuery();

  // Getting out Category Names from API Data
  const categoriesArray = categoriesData?.data?.categories.map((category) => ({
    value: String(category.name).toLowerCase(),
    label: category.name,
  }));

  // Getting out Account Names from API Data
  const accountsArray = accountData?.data?.accounts.map((account) => ({
    value: String(account.name).toLowerCase(),
    label: account.name,
  }));

  // Category names for initial value to help filter the data
  const initialCategoryNames = categoriesData?.data?.categories.map(
    (category) => String(category.name).toLowerCase()
  );

  // Account names for initial value to help filter the data
  const initialAccountNames = accountData?.data?.accounts.map((account) =>
    String(account.name).toLowerCase()
  );

  // UseStates
  const [dateRange, setDateRange] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [selectedCategory, setSelectedCategory] =
    useState(initialCategoryNames);
  const [selectedAccount, setSelectedAccount] = useState(initialAccountNames);
  const [transactionTypes, setTransactionTypes] = useState([
    "income",
    "expense",
  ]);

  // useEffect(() => {
  //   const filteredData = data?.data.transaction.filter((transaction) => {
  //     // Formatting Date from server
  //     const isoDate = moment.utc(transaction.dateRange);
  //     const formattedDate = moment(isoDate._d).format("L");

  //     // console.log(formattedDate);
  //     if (
  //       dateRange &&
  //       dateRange.to !== undefined &&
  //       dateRange.from !== undefined &&
  //       dateRange !== undefined
  //     ) {
  //       return (
  //         formattedDate >= moment(dateRange.from).format("L") &&
  //         formattedDate <= moment(dateRange.to).format("L")
  //       );
  //     } else {
  //       return null;
  //     }
  //   });

  //   setFilteredData(filteredData);
  // }, [dateRange, data?.data]);

  // Handlers
  const transactionTypeHandler = (e) => {
    if (e.target.checked) {
      setTransactionTypes((prevState) => [...prevState, e.target.value]);
    } else {
      setTransactionTypes((prevState) =>
        prevState.filter((item) => item !== e.target.value)
      );
    }
  };

  const applyFilterHandler = () => {
    // Filter the data based on selected filters
    const filteredData = data?.data.transaction.filter((transaction) => {
      // Formatting Date from server
      const isoDate = moment.utc(transaction.dateRange);
      const formattedDate = moment(isoDate._d).format("L");

      console.log("Transaction:", transaction);
      console.log("Formatted Date:", formattedDate);
      console.log("Date Range:", dateRange);

      // Check if the transaction falls within the selected date range
      const isDateInRange =
        formattedDate >= moment(dateRange.from).format("L") &&
        formattedDate <= moment(dateRange.to).format("L");

      console.log("Is Date In Range:", isDateInRange);

      // Check if the transaction's category is included in the selected categories
      const isCategoryIncluded = selectedCategory.includes(
        String(transaction.category).toLowerCase()
      );

      console.log("Is Category Included:", isCategoryIncluded);

      // Check if the transaction's account is included in the selected accounts
      const isAccountIncluded = selectedAccount.includes(
        String(transaction.account).toLowerCase()
      );

      console.log("Is Account Included:", isAccountIncluded);

      // Check if the transaction type is included in the selected transaction types
      const isTransactionTypeIncluded = transactionTypes.includes(
        String(transaction.type).toLowerCase()
      );

      console.log("Is Transaction Type Included:", isTransactionTypeIncluded);
      console.log("Transaction Type:", transaction.type);
      console.log("Selected Transaction Types:", transactionTypes);

      // Return true if all conditions are met, otherwise false
      const result =
        isDateInRange &&
        isCategoryIncluded &&
        isAccountIncluded &&
        isTransactionTypeIncluded;

      console.log("Result:", result);

      return result;
    });

    console.log("Filtered Data:", filteredData);

    // Pass the filtered data to the prop
    setFilteredData(filteredData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.headingContainer}>
        <p className={styles.heading}>Filters</p>
        <Button variant="outline" onClick={applyFilterHandler}>
          Apply
        </Button>
      </div>

      <div className={styles.filterInputsContainer}>
        {/* Date Range */}
        <EBDateRangePicker date={dateRange} setDate={setDateRange} />

        {/* Transaction Type */}
        <div>
          <p className={styles.transactionFilterHeading}>Transaction Type</p>
          <div className={styles.checkBoxContainer}>
            <div className={styles.singleCheckboxContainer}>
              <input
                type="checkbox"
                value="income"
                checked={transactionTypes.includes("income")}
                onChange={transactionTypeHandler}
                id="income"
                className={`${styles.transactionTypeCheckBox} ${styles.incomeCheckbox}`}
              />
              <label htmlFor="income" className={styles.typeLabel}>
                Income
              </label>
            </div>
            <div className={styles.singleCheckboxContainer}>
              <input
                type="checkbox"
                value="expense"
                checked={transactionTypes.includes("expense")}
                onChange={transactionTypeHandler}
                id="expense"
                className={`${styles.transactionTypeCheckBox} ${styles.expenseCheckbox}`}
              />
              <label htmlFor="expense" className={styles.typeLabel}>
                Expense
              </label>
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <p className={styles.transactionFilterHeading}>Categories</p>

          <Select
            options={categoriesArray}
            defaultValue={categoriesArray?.map((ele) => ele)}
            onChange={(val) => {
              setSelectedCategory(() => {
                const newValues = val.map((ele) => ele.value);
                // Filter out duplicates using a Set
                const uniqueValues = Array.from(new Set([...newValues]));
                return uniqueValues;
              });
            }}
            isMulti
          />
        </div>

        {/* Accounts */}
        <div>
          <p className={styles.transactionFilterHeading}>Accounts</p>

          <Select
            options={accountsArray}
            defaultValue={accountsArray?.map((ele) => ele)}
            onChange={(val) => {
              setSelectedAccount(() => {
                const newValues = val.map((ele) => ele.value);
                // Filter out duplicates using a Set
                const uniqueValues = Array.from(new Set([...newValues]));
                return uniqueValues;
              });
            }}
            isMulti
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionsFilterSideBar;
