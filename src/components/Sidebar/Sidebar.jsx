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
        <img src="./logo.png" alt="logo" className={styles.logo} />

        <div className={styles.menu}>
          <NavLink
            to="dashboard"
            title={"Dashboard"}
            className={`${styles.navLink} ${
              pathname === "/dashboard" ? styles.activeNavLink : null
            }`}
          >
            <div className={styles.item}>
              <GoHomeFill
                size={20}
                className={`${
                  pathname === "/dashboard" ? styles.activeIcon : null
                }`}
              />
              <p className={styles.navLinkText}>Home</p>
            </div>
          </NavLink>

          <NavLink
            to="statistics"
            className={`${styles.navLink} ${
              pathname === "/statistics" ? styles.activeNavLink : null
            }`}
            title={"Statistics"}
          >
            <div className={styles.item}>
              <FaChartPie
                size={20}
                className={`${
                  pathname === "/statistics" ? styles.activeIcon : null
                }`}
              />
              <p className={styles.navLinkText}>Statistics</p>
            </div>
          </NavLink>

          <NavLink
            to="transactions"
            className={`${styles.navLink} ${
              pathname === "/transactions" ? styles.activeNavLink : null
            }`}
            title={"Transactions"}
          >
            <div className={styles.item}>
              <FaListUl
                size={16}
                className={`${
                  pathname === "/transactions" ? styles.activeIcon : null
                }`}
              />
              <p className={styles.navLinkText}>Transactions</p>
            </div>
          </NavLink>

          <NavLink
            to="configure"
            className={`${styles.navLink} ${
              pathname === "/configure" ? styles.activeNavLink : null
            }`}
            title={"Configure"}
          >
            <div className={styles.item}>
              <BsDatabase
                size={20}
                className={`${
                  pathname === "/configure" ? styles.activeIcon : null
                }`}
              />
              <p className={styles.navLinkText}>Configure</p>
            </div>
          </NavLink>
        </div>

        <div className={styles.toolsContainer}>
          {/* <p className={styles.toolsHeading}>Tools</p> */}

          <NavLink
            to="settings"
            className={`${styles.navLink} ${
              pathname === "/settings" ? styles.activeNavLink : null
            }`}
            title={"Settings"}
          >
            <div className={styles.item}>
              <IoSettingsOutline
                size={20}
                className={`${
                  pathname === "/settings" ? styles.activeIcon : null
                }`}
              />
              <p className={styles.navLinkText}>Settings</p>
            </div>
          </NavLink>
          <NavLink
            to="/help"
            className={`${styles.navLink} ${
              pathname === "/help" ? styles.activeNavLink : null
            }`}
            title={"Help"}
          >
            <div className={styles.item}>
              <IoIosHelpCircleOutline
                size={20}
                className={`${pathname === "/help" ? styles.activeIcon : null}`}
              />
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
