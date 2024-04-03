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
import { useGetAllCategoriesQuery } from "@/store/apiSlices/childApiSlices/categoryApiSlice";

// Local enums

// Local constants

// Local Interfaces

const RecentTransactions = () => {
  const navigate = useNavigate();
  const [viewTransactionModalOpen, setViewTransactionModalOpen] = useState({});

  // Fetching Transactions from server
  const { data } = useGetAllTransactionsQuery();

  const { data: categoriesData } = useGetAllCategoriesQuery();

  const recentTransactions = data?.data?.transaction
    .slice(0, 10)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <>
      <h3 className={styles.heading}>Recent Transactions</h3>
      {recentTransactions.length !== 0 &&
        recentTransactions?.map((currEle) => {
          return (
            <div className={styles.recentTransactionCard} key={currEle.date}>
              <div className={styles.categoryDetails}>
                <p className={styles.categoryEmoji}>
                  {
                    categoriesData?.data?.categories?.find(
                      (ele) =>
                        String(ele.name.toLowerCase()).toLowerCase() ===
                        String(currEle.category.toLowerCase()).toLowerCase()
                    )?.emoji
                  }
                </p>
                <div className={"capitalize"}>
                  <TextWithEllipsis
                    className={styles.transactionCategory}
                    maxLength={6}
                  >
                    {currEle.title}
                  </TextWithEllipsis>
                  <p className={styles.transactionDate}>
                    {moment(currEle.date).format("L")}
                  </p>
                </div>
              </div>

              <div className={"capitalize"}>
                <TextWithEllipsis
                  className={`${
                    currEle.type === "expense" ? "errorColor" : "successColor"
                  }`}
                  maxLength={7}
                >
                  {currEle.account}
                </TextWithEllipsis>
              </div>
              <div>
                <TextWithEllipsis
                  className={`${
                    currEle.type === "expense" ? "errorColor" : "successColor"
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
                  onClick={() => {
                    setViewTransactionModalOpen((prevState) => ({
                      ...prevState,
                      [currEle.date]: true,
                    }));
                  }}
                />
                <ViewTransactionModal
                  open={viewTransactionModalOpen[currEle.date] || false}
                  setOpen={(value) => {
                    setViewTransactionModalOpen((prevState) => {
                      return {
                        ...prevState,
                        [currEle.date]: value,
                      };
                    });
                  }}
                  data={currEle}
                />
              </div>
            </div>
          );
        })}
      {recentTransactions?.length === 0 && (
        <div className={styles.noTransactionsText}>
          <p>No Transactions Found</p>
        </div>
      )}
      {recentTransactions?.length !== 0 && (
        <div
          className={styles.seeAllTransactions}
          onClick={() => navigate("/transactions")}
        >
          <p>See all Transaction </p>
          <FaLongArrowAltRight />
        </div>
      )}
    </>
  );
};

export default RecentTransactions;
