// React

// Thirdparty
import { IoIosArrowForward } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./RecentTransactions.module.css";
import TextWithEllipsis from "../TextWithEllipsis/TextWithEllipsis";
import { useNavigate } from "react-router";

// Local enums

// Local constants

// Local Interfaces

const RecentTransactions = (props) => {
  const { data: userData } = props;
  const navigate = useNavigate();

  const recentTransactions = userData.transactions
    .slice(0, 10)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <h3 className={styles.heading}>Recent Transactions</h3>
      {recentTransactions.map((currEle) => (
        <div className={styles.recentTransactionCard} key={currEle.date}>
          <div className={styles.categoryDetails}>
            <p className={styles.categoryEmoji}>
              {
                userData.categories.filter(
                  (ele) => ele.name === currEle.category
                )[0].emoji
              }
            </p>
            <div>
              <TextWithEllipsis
                className={styles.transactionCategory}
                maxLength={6}
              >
                {currEle.category}
              </TextWithEllipsis>
              <p className={styles.transactionDate}>
                {new Date(currEle.date).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div>
            <TextWithEllipsis
              className={`${
                currEle.type === "debit" ? "errorColor" : "successColor"
              }`}
              maxLength={7}
            >
              {currEle.account}
            </TextWithEllipsis>
          </div>
          <div>
            <TextWithEllipsis
              className={`${
                currEle.type === "debit" ? "errorColor" : "successColor"
              }`}
              maxLength={7}
            >
              {`$ ${currEle.amount}`}
            </TextWithEllipsis>
          </div>
          <div>
            <IoIosArrowForward size={20} />
          </div>
        </div>
      ))}
      <div
        className={styles.seeAllTransactions}
        onClick={() => navigate("/transactions")}
      >
        <p>See all Transaction </p>
        <FaLongArrowAltRight />
      </div>
    </div>
  );
};

export default RecentTransactions;
