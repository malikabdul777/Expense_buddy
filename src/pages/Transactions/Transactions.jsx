// React

// Thirdparty

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import { useSelector } from "react-redux";
import styles from "./Transactions.module.css";

// Local enums

// Local constants

// Local Interfaces

const Transactions = () => {
  const value = useSelector((state) => state.counter.value);

  return <div>Transactions - {value}</div>;
};

export default Transactions;
