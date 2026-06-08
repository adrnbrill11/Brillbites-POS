import { useState, useEffect } from "react";
import useAuthStore from "../store/authStore";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function AdminPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await api.get("/orders");
        setTransactions(response.data.orders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  // ✅ Ayos na — walang clearTransactions sa backend pa, so confirm lang
  function handleClearTransactions() {
    const clr = confirm("Are you sure you want to clear data?");
    if (clr) {
      setTransactions([]); // local clear lang muna
    } else {
      console.log("Cancelled");
    }
  }

  // ✅ Fixed field names para match sa backend response
  function exportToExcel() {
    const data = transactions.map((t) => ({
      "Order #": t.id,
      Date: new Date(t.createdAt).toLocaleDateString(),
      Time: new Date(t.createdAt).toLocaleTimeString(),
      Items: t.items
        .map((i) => {
          const name = i.product?.name ?? "Unknown";
          return `${name} x${i.quantity}`;
        })
        .join(", "),
      Total: t.total,
      Payment: t.paymentMethod,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, worksheet, "Transactions");
    XLSX.writeFile(workBook, "BrillBites_Sales.xlsx");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
            <p className="text-sm text-gray-400">Welcome, {user?.username}!</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/")}
              className="border border-gray-300 text-gray-600 rounded-lg px-3 py-1 text-xs hover:bg-gray-100 transition-all"
            >
              POS
            </button>
            <button
              onClick={handleLogout}
              className="border border-gray-300 text-gray-600 rounded-lg px-3 py-1 text-xs hover:bg-gray-100 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">
              {transactions.length}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400">Total Sales</p>
            <p className="text-2xl font-bold text-gray-800">
              ₱{transactions.reduce((sum, t) => sum + t.total, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-400">Average Order</p>
            <p className="text-2xl font-bold text-gray-800">
              ₱{transactions.length > 0
                ? (transactions.reduce((sum, t) => sum + t.total, 0) / transactions.length).toFixed(2)
                : "0.00"}
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium text-gray-800 text-sm">Transactions</h2>
            <div className="flex gap-2">
              <button
                onClick={exportToExcel}
                className="bg-green-600 text-white rounded-lg px-3 py-1 text-xs hover:bg-green-700 transition-all"
              >
                Export to Excel
              </button>
              <button
                onClick={handleClearTransactions}
                className="bg-red-600 text-white rounded-lg px-3 py-1 text-xs hover:bg-red-500 transition-all"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <p className="text-center text-gray-400 text-sm py-6">Loading...</p>
          )}

          {/* Empty State */}
          {!loading && transactions.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-6">
              No Transactions
            </p>
          )}

          {/* Table */}
          {!loading && transactions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-xs">
                    <th className="text-left py-2 pr-4">Order #</th>
                    <th className="text-left py-2 pr-4">Date</th>
                    <th className="text-left py-2 pr-4">Time</th>
                    <th className="text-left py-2 pr-4">Items</th>
                    <th className="text-left py-2 pr-4">Payment</th>
                    <th className="text-right py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((t) => (
                    <tr key={t.id} className="border-b border-gray-100 text-gray-700">
                      <td className="py-2 pr-4">{t.id}</td>
                      <td className="py-2 pr-4">{new Date(t.createdAt).toLocaleDateString()}</td>
                      <td className="py-2 pr-4">{new Date(t.createdAt).toLocaleTimeString()}</td>
                      <td className="py-2 pr-4 text-xs text-gray-400">
                        {t.items.map((i) => `${i.product?.name ?? "Unknown"} x${i.quantity}`).join(", ")}
                      </td>
                      <td className="py-2 pr-4">{t.paymentMethod}</td>
                      <td className="py-2 text-right font-medium">₱{t.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}