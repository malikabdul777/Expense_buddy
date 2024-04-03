// React

// Thirdparty
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CiBellOn } from "react-icons/ci";
import { MdOutlineWifiTetheringErrorRounded } from "react-icons/md";

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./Layout.module.css";
import "./layout.css";
import Sidebar from "../Sidebar/Sidebar";
import { useGetAllTransactionsQuery } from "@/store/apiSlices/childApiSlices/transactionsApiSlice";

// Local enums

// Local constants

// Local Interfaces

const Layout = () => {
  const { pathname } = useLocation();

  // Fetching Transactions from server
  const { data, isSuccess, isError, isLoading, error } =
    useGetAllTransactionsQuery();

  return (
    <div className={styles.container}>
      {pathname === "/" && <Navigate to="/dashboard" />}
      <Sidebar />
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <p className={styles.heading}>Welcome, Abdul!</p>

          <div className={styles.notificationContainer}>
            <CiBellOn size={25} className={styles.bellIcon} />
          </div>
        </div>
        <div className={styles.outlet}>
          {isLoading && (
            <div className={styles.dataLoadingContainer}>
              <div className="simple-spinner">
                <span></span>
              </div>
              <p className={styles.loadingText}>Data is being loaded...</p>
            </div>
          )}
          {isError && (
            <div className={styles.dataLoadingContainer}>
              <MdOutlineWifiTetheringErrorRounded size={40} color={"#df6555"} />
              <p className={styles.errorText}>Something went wrong...</p>
            </div>
          )}
          {data && <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default Layout;
