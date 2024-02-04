// React

// Thirdparty
import { Navigate, Outlet, useLocation } from "react-router-dom";

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

// Local enums

// Local constants

// Local Interfaces

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div>
      {pathname === "/" && <Navigate to="/dashboard" />}
      Layout
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
