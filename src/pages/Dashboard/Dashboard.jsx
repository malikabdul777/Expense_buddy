// React

// Thirdparty

// Utils
import data from "../../data/data_updated";

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./Dashboard.module.css";

// Local enums

// Local constants

// Local Interfaces

const Dashboard = () => {
  useEffect(() => {
    let userData = data;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthsTransactions = userData.transactions.filter(
      (currentTransaction) => {
        console.log(currentTransaction.date);
      }
    );
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.statsOverviewCardsContainer}>
          <div className={styles.statsOverviewCard}></div>
          <div className={styles.statsOverviewCard}></div>
        </div>
      </div>
      <div className={styles.rightContainer}></div>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";

const TransactionsComponent = ({ transactions }) => {
  const [monthlySummary, setMonthlySummary] = useState({
    income: 0,
    expenses: 0,
  });

  useEffect(() => {
    const currentMonth = new Date().getMonth(); // January is 0!
    const currentYear = new Date().getFullYear();

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

    const summary = filteredTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "credit") {
          acc.income += transaction.amount;
        } else if (transaction.type === "debit") {
          acc.expenses += transaction.amount;
        }
        return acc;
      },
      { income: 0, expenses: 0 }
    );

    setMonthlySummary(summary);
  }, [transactions]);

  return (
    <div>
      <h2>Monthly Summary</h2>
      <p>Income: ${monthlySummary.income.toFixed(2)}</p>
      <p>Expenses: ${monthlySummary.expenses.toFixed(2)}</p>
    </div>
  );
};
