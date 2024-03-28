// React

// Thirdparty
import { IoIosArrowForward } from "react-icons/io";
import { FaLongArrowAltRight, FaRegEye } from "react-icons/fa";

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
import TextWithEllipsis from "../ui/TextWithEllipsis/TextWithEllipsis";
import { useNavigate } from "react-router";
import { useGetAllTransactionsQuery } from "@/store/apiSlices/childApiSlices/transactionsApiSlice";
import moment from "moment";
import ViewTransactionModal from "../ViewTransactionModal/ViewTransactionModal";
import { useState } from "react";

// Local enums

// Local constants

// Local Interfaces

const RecentTransactions = () => {
  const navigate = useNavigate();
  const [viewTransactionModalOpen, setViewTransactionModalOpen] = useState({});

  // Fetching Transactions from server
  const { data, isSuccess, isError, isLoading, error } =
    useGetAllTransactionsQuery();
  console.log(data.data.transaction);

  const recentTransactions = data?.data?.transaction
    .slice(0, 10)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <h3 className={styles.heading}>Recent Transactions</h3>
      {recentTransactions?.map((currEle) => {
        return (
          <div className={styles.recentTransactionCard} key={currEle.createdAt}>
            <div className={styles.categoryDetails}>
              <p className={styles.categoryEmoji}>
                {/* {
                  userData.categories.filter(
                    (ele) => ele.name === currEle.category
                  )[0].emoji
                } */}{" "}
                🥑
              </p>
              <div>
                <TextWithEllipsis
                  className={styles.transactionCategory}
                  maxLength={6}
                >
                  {currEle.title}
                </TextWithEllipsis>
                <p className={styles.transactionDate}>
                  {moment(currEle.createdAt).format("L")}
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
              <FaRegEye
                size={15}
                className={"cursor-pointer"}
                onClick={() => setViewTransactionModalOpen(true)}
              />
              <ViewTransactionModal
                open={viewTransactionModalOpen[currEle.createdAt] || false}
                setOpen={(value) =>
                  setViewTransactionModalOpen((prevState) => ({
                    ...prevState,
                    [currEle.createdAt]: value,
                  }))
                }
                data={currEle}
              />
            </div>
          </div>
        );
      })}
      <div
        className={styles.seeAllTransactions}
        onClick={() => navigate("/transactions")}
      >
        <p>See all Transaction </p>
        <FaLongArrowAltRight />
      </div>
    </>
  );
};

export default RecentTransactions;
