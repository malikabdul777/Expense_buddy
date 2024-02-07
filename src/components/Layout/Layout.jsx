// React

// Thirdparty
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { CiBellOn } from "react-icons/ci";

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
import Sidebar from "../Sidebar/Sidebar";

// Local enums

// Local constants

// Local Interfaces

const Layout = () => {
  const { pathname } = useLocation();

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
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
