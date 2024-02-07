// React

// Thirdparty
import { NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FaChartPie } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { BsDatabase } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";

// Utils

// APISlices

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./Sidebar.module.css";

// Local enums

// Local constants

// Local Interfaces

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className={styles.container}>
        <img src="./logo EBV2.png" alt="logo" className={styles.logo} />

        <div className={styles.menu}>
          <NavLink
            to="dashboard"
            title={"Dashboard"}
            className={styles.navLink}
          >
            <div
              className={`${styles.item} ${
                pathname === "/dashboard" ? styles.activeNavLink : null
              }`}
            >
              <GoHomeFill size={20} />
              <p className={styles.navLinkText}>Home</p>
            </div>
          </NavLink>

          <NavLink
            to="statistics"
            className={styles.navLink}
            title={"Statistics"}
          >
            <div
              className={`${styles.item} ${
                pathname === "/statistics" ? styles.activeNavLink : null
              }`}
            >
              <FaChartPie size={20} />
              <p className={styles.navLinkText}>Statistics</p>
            </div>
          </NavLink>

          <NavLink
            to="transactions"
            className={styles.navLink}
            title={"Transactions"}
          >
            <div
              className={`${styles.item} ${
                pathname === "/transactions" ? styles.activeNavLink : null
              }`}
            >
              <FaListUl size={16} />
              <p className={styles.navLinkText}>Transactions</p>
            </div>
          </NavLink>

          <NavLink to="accounts" className={styles.navLink} title={"Accounts"}>
            <div
              className={`${styles.item} ${
                pathname === "/accounts" ? styles.activeNavLink : null
              }`}
            >
              <BsDatabase size={20} />
              <p className={styles.navLinkText}>Accounts</p>
            </div>
          </NavLink>
        </div>

        <div className={styles.toolsContainer}>
          <p className={styles.toolsHeading}>Tools</p>

          <NavLink to="settings" className={styles.navLink} title={"Settings"}>
            <div
              className={`${styles.item} ${
                pathname === "/settings" ? styles.activeNavLink : null
              }`}
            >
              <IoSettingsOutline size={20} />
              <p className={styles.navLinkText}>Settings</p>
            </div>
          </NavLink>
          <NavLink to="/help" className={styles.navLink} title={"Help"}>
            <div
              className={`${styles.item} ${
                pathname === "/help" ? styles.activeNavLink : null
              }`}
            >
              <IoIosHelpCircleOutline size={20} />
              <p className={styles.navLinkText}>Help</p>
            </div>
          </NavLink>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default Sidebar;
