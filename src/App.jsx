import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Layout
import Layout from "./components/Layout/Layout";

// Pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Statistics from "./pages/Statistics/Statistics";
import Transactions from "./pages/Transactions/Transactions";
import Configure from "./pages/Configure/Configure";
import Help from "./pages/Help/Help";
import SignUp from "./pages/SignUp/SignUp";
import SignIn from "./pages/SignIn/SignIn";

// Toast
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AiAssistant from "./pages/AiAssistant/AiAssistant";

function App() {
  const { currentUser } = useSelector((state) => state.persistedReducer?.user);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {" "}
          {/* Private Routes */}
          {currentUser ? (
            <Route path="/" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="configure" element={<Configure />} />
              {/* <Route path="ai_assistant" element={<AiAssistant />} /> */}
              <Route path="help" element={<Help />} />

              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Route> // If not authenticated, redirect to sign-in page
          ) : (
            <Route path="*" element={<Navigate to="/signin" />} />
          )}
          {/* Public Routes */}
          <Route
            path="signup"
            element={!currentUser ? <SignUp /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="signin"
            element={!currentUser ? <SignIn /> : <Navigate to="/dashboard" />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-center" />
    </div>
  );
}

export default App;
