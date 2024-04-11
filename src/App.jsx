import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Layout
import Layout from "./components/Layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Statistics from "./pages/Statistics/Statistics";
import Transactions from "./pages/Transactions/Transactions";
import Configure from "./pages/Configure/Configure";
import Settings from "./pages/Settings/Settings";
import Help from "./pages/Help/Help";
import AddTransactionButton from "./components/AddTransactionButton/AddTransactionButton";
import SignUp from "./pages/SignUp/Signup";
import SignIn from "./pages/SignIn/SignIn";

// Toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="configure" element={<Configure />} />
            <Route path="settings" element={<Settings />} />
            <Route path="help" element={<Help />} />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
          <Route path="signup" element={<SignUp />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" />
      <AddTransactionButton />
    </div>
  );
}

export default App;
