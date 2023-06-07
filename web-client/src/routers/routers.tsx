import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Login/LoginPage";
import RegistrationPage from "../pages/Register/RegisterPage";
import ForgotPasswordPage from "../pages/Register/ForgotPasswordPage";
import AdminRootLayout from "../pages/RootLayout/AdminRootLayout";
import ManageUserPage from "../pages/UserManagement/ManageUserPage";
import VerifyUserPage from "../pages/UserManagement/VerifyUserPage";
import ManageTeamPage from "../pages/TeamManagement/ManageTeamPage";
import EmergencyReportsPage from "../pages/EmergencyReports/EmergencyReportsPage";
import HazardReportsPage from "../pages/HazardReports/HazardReportsPage";
import ManageMapPage from "../pages/MapManagement/ManageMapPage";
import ManageAlertsPage from "../pages/AlertsManagement/ManageAlertsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AdminRootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "users",
        // loader:
        children: [
          { index: true, element: <ManageUserPage /> },
          { path: "verify-users", element: <VerifyUserPage /> },
        ],
      },
      {
        path: "teams",
        element: <ManageTeamPage />,
      },
      {
        path: "emergency-reports",
        element: <EmergencyReportsPage />,
      },
      {
        path: "hazard-reports",
        element: <HazardReportsPage />,
      },
      {
        path: "facility-map",
        element: <ManageMapPage />,
      },
      {
        path: "disaster-alerts",
        element: <ManageAlertsPage />,
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegistrationPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
]);
