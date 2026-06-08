import { create } from "zustand";
import api from "../api/api";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: !!localStorage.getItem("user"),

  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const userData = { ...response.data.user, token: response.data.token };

    localStorage.setItem("user", JSON.stringify(userData));
    set({ user: userData, isLoggedIn: true });
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isLoggedIn: false });
  },
}));

export default useAuthStore;




