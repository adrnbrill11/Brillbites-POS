import { Routes, Route } from "react-router-dom";
import OrderPage from "../pages/OrderPage";
import LoginPage from "../pages/LoginPage";
import AdminPage from "../pages/AdminPage";
import ProtectedRoutes from "../components/ProtectedRoutes";
import InventoryPage from "../pages/InventoryPage"

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <OrderPage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoutes adminOnly={true}>
            <AdminPage />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/inventory"
        element={
          <ProtectedRoutes adminOnly={true}>
            <InventoryPage />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
}
