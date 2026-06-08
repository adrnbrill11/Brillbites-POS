import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  async function handleLogin() {
    try {
      setLoading(true);
      setError("");
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-xl border border-gray-200 p-8 w-full max-w-sm flex flex-col gap-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">BrillBites</h1>
          <p className="text-sm text-gray-400 mt-1">Sign in to BrillBites</p>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
        />

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 transition-all"
        >
           {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
