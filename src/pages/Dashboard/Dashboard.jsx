// React
import { useState, useEffect } from "react";

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
import RecentTransactions from "../../components/RecentTransactions/RecentTransactions";

// Local enums

// Local constants

// Local Interfaces

const Dashboard = () => {
  const [monthlySummary, setMonthlySummary] = useState({
    income: 0,
    expenses: 0,
  });

  let userData = data;

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthsTransactions = userData.transactions.filter(
      (currentTransaction) => {
        const transactionDate = new Date(currentTransaction.date);

        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      }
    );

    const filteredTransactions = thisMonthsTransactions.reduce(
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

    // console.log(filteredTransactions);

    setMonthlySummary(filteredTransactions);
  }, [userData]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.statsOverviewCardsContainer}>
          <div className={styles.statsOverviewCard}>
            <h3>Income</h3>
            <p>$ {monthlySummary.income.toFixed(2)}</p>
            <p>This Month</p>
          </div>
          <div className={styles.statsOverviewCard}>
            <h3>Expense</h3>
            <p>$ {monthlySummary.expenses.toFixed(2)}</p>
            <p>This Month</p>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <RecentTransactions data={userData} />
      </div>
    </div>
  );
};

export default Dashboard;
