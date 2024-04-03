// React
import { useState, useEffect } from "react";

// Thirdparty
import { FiArrowUpRight } from "react-icons/fi";
import { FiArrowDownRight } from "react-icons/fi";
import { RiEqualLine } from "react-icons/ri";

// Utils
import { default as userData } from "../../data/data_updated";

// APISlices

// Slice

// CustomHooks

// Components
import RecentTransactions from "../../components/RecentTransactions/RecentTransactions";
import DashboardChart from "@/components/DashboardChart/DashboardChart";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./Dashboard.module.css";
import AddTransactionButton from "@/components/AddTransactionButton/AddTransactionButton";
import { useGetAllTransactionsQuery } from "@/store/apiSlices/childApiSlices/transactionsApiSlice";

// Local enums

// Local constants

// Local Interfaces

const Dashboard = () => {
  const [monthlySummary, setMonthlySummary] = useState({
    income: 0,
    expenses: 0,
  });
  const [activeChartTab, setActiveChartTab] = useState("Month");

  // Fetching Transactions from server
  const { data } = useGetAllTransactionsQuery();

  // console.log("Data from API", data.data.transaction);

  useEffect(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Getting current month transactions
    const thisMonthsTransactions = data.data.transaction.filter(
      (currentTransaction) => {
        const transactionDate = new Date(currentTransaction.date);

        return (
          transactionDate.getMonth() === currentMonth &&
          transactionDate.getFullYear() === currentYear
        );
      }
    );

    // Calculating monthly income and expenses
    const filteredTransactions = thisMonthsTransactions.reduce(
      (acc, transaction) => {
        if (transaction.type === "income") {
          acc.income += transaction.amount;
        } else if (transaction.type === "expense") {
          acc.expenses += transaction.amount;
        }
        return acc;
      },
      { income: 0, expenses: 0 }
    );

    setMonthlySummary(filteredTransactions);
  }, [data?.data?.transaction]);

  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.statsOverviewCardsContainer}>
          <div className={styles.statsOverviewCard}>
            <div className={styles.overviewHeadingContainer}>
              <div className={styles.overviewCardIconContainer}>
                <FiArrowUpRight size={22} />
              </div>
              <h3>Income</h3>
            </div>
            <p>$ {monthlySummary.income.toFixed(2)}</p>
            <p>This Month</p>
          </div>
          <div className={styles.statsOverviewCard}>
            <div className={styles.overviewHeadingContainer}>
              <div
                className={`${styles.overviewCardIconContainer} ${styles.expenseIconContainer}`}
              >
                <FiArrowDownRight size={22} />
              </div>
              <h3>Expense</h3>
            </div>
            <p>$ {monthlySummary.expenses.toFixed(2)}</p>
            <p>This Month</p>
          </div>
          <div className={styles.statsOverviewCard}>
            <div className={styles.overviewHeadingContainer}>
              <div
                className={`${styles.overviewCardIconContainer} ${styles.balanceIconContainer}`}
              >
                <RiEqualLine size={22} />
              </div>
              <h3>Balance</h3>
            </div>
            <p>
              $ {(monthlySummary.income - monthlySummary.expenses).toFixed(2)}
            </p>
            <p>This Month</p>
          </div>
        </div>
        <div className={styles.dashboardChartContainer}>
          <div className={styles.chartHeader}>
            <div>
              <h3>Report for this Month</h3>
              <div className={styles.legendsContainer}>
                <div className={styles.legendContainer}>
                  <div className={styles.legendIndicator}></div>
                  <p>Income</p>
                </div>
                <div className={styles.legendContainer}>
                  <div
                    className={`${styles.legendIndicator} ${styles.expenseLegendIndicator}`}
                  ></div>
                  <p>Expense</p>
                </div>
              </div>
            </div>
            <div className={styles.tabsContainer}>
              <div
                className={`${styles.tab} ${
                  activeChartTab === "Week" ? styles.activeTab : null
                }`}
                onClick={() => setActiveChartTab("Week")}
              >
                <p>Week</p>
              </div>
              <div
                className={`${styles.tab} ${
                  activeChartTab === "Month" ? styles.activeTab : null
                }`}
                onClick={() => setActiveChartTab("Month")}
              >
                <p>Month</p>
              </div>
            </div>
          </div>

          <div className={styles.dashboardChart}>
            <DashboardChart />
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <RecentTransactions />
      </div>
    </div>
  );
};

export default Dashboard;
