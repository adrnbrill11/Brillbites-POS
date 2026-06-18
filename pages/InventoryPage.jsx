import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import api from "../api/api";

export default function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to Fetch product", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    try {
      if (editProduct) {
        await api.put(`/products/${editProduct.id}`, form);
      } else {
        await api.post("/products", form);
      }
      fetchProducts();
      setShowForm(false);
      setEditProduct(null);
      setForm({ name: "", category: "", price: "", stock: "" });
    } catch (error) {
      console.error("Failed to save products", error);
    }
  }

  async function handleDelete() {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product", error);
    }
  }

  function handleEdit(product) {
    setEditProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
    });
    setShowForm(true);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/*Header*/}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Inventory</h1>
            <p className="text-sm text-gray-400">Welcome, {user?.name}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate = ("/admin")}
              className="border border-gray-300 text-gray-600 rounded-lg px-3 py-1 text-xs hover:bg-gray-100 transition-all"
            >
              Admin
            </button>
            <button
              onClick={() => navigate("/")}
              className="border border-gray-300 text-gray-600 rounded-lg px-3 py-1 text-xs hover:bg-gray-100 transition-all"
            >
              POS
            </button>
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="border border-gray-300 text-gray-600 rounded-lg px-3 py-1 text-xs hover:bg-gray-100 transition-all"
            >
              Logout
            </button>
          </div>
        </div>

        {/*Add Product Button*/}
        <button
          onClick={() => {
            setShowForm(true);
            setEditProduct(null);
            setForm({ name: "", category: "", price: "", stock: "" });
          }}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-medium w-fit hover:bg-gray-700 transition-all"
        >
          + Add Product
        </button>
        {/*Form*/}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4">
            <h2 className="font-medium text-gray-800">
              {editProduct ? "Edit Product" : "Add Product"}
            </h2>
            <input
              type="text"
              placeholder="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <input
              type="text"
              placeholder="category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />
            <input
              type="number"
              placeholder="stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
            />

            <div className="flex gap-2">
              <button
                onClick={handleSubmit}
                className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm hover:bg-gray-700 transition-all"
              >
                {editProduct ? "Update" : "Add"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditProduct(null);
                }}
                className="border border-gray-300 text-gray-600 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/*Products Table*/}

        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <h2 className="font-medium text-gray-800 text-sm mb-4">Products</h2>
          {loading && (
            <p className="text-center text-gray-400 text-sm py-6">Loading...</p>
          )}
          {!loading && products.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-6">
              No products yet!
            </p>
          )}

          {!loading && products.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 text-xs">
                    <th className="text-left py-2 pr-4">Name</th>
                    <th className="text-left py-2 pr-4">Category</th>
                    <th className="text-left py-2 pr-4">Price</th>
                    <th className="text-left py-2 pr-4">Stock</th>
                    <th className="text-left py-2 pr-4">Available!</th>
                    <th className="text-right py-2 pr-4">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-b border-gray-100 text-gray-700">
                      <td className="py-2 pr-4">{p.name}</td>
                      <td className="py-2 pr-4">{p.category}</td>
                      <td className="py-2 pr-4">₱{parseFloat(p.price).toFixed(2)}</td>
                      <td className="py-2 pr-4">{p.stock}</td>
                      <td className="py-2 pr-4">
                        <span className={`text-xs px-2 py-1 rounded-full ${p.isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}>
                             {p.isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                    
                    <td className="py-2 text-right">
                        <div className="flex gap-2 justify-end">
                            <button onClick={() => handleEdit(p)} className="text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50">
                                Edit
                            </button>
                            <button onClick={() => handleDelete(p)} className="text-xs border border-gray-300 rounded px-2 py-1 hover:bg-gray-50">
                                Delete
                            </button>
                        </div>
                    </td>

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
