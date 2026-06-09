import BurgerSection from "../components/BurgerSection";
import FriesSection from "../components/FriesSection";
import FruitSodaSection from "../components/FruitSodaSection";
import MilkshakeSection from "../components/MilkshakeSection";
import FrappeSection from "../components/FrappeSection";
import ComboSection from "../components/ComboSection";
import IceCoffeeSection from "../components/IceCoffeeSection";
import HamSandwichSection from "../components/HamSandwichSection";
import CartPanel from "../components/CartPanel";
import useAuthStore from "../store/authStore";
import { useNavigate } from "react-router-dom";
import autoLogout from "../hooks/autoLogout";

export default function OrderPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  autoLogout(10);

  return (
    <main className="min-h-screen bg-[url('/background.png')] bg-cover bg-center bg-no-repeat p-6">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 lg:grid-cols-[1fr_380px]">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">BrillBites POS</h1>
          <p className="text-sm text-gray-500">Welcome {user?.username}!</p>
        </div>

        <div className="flex gap-2">
          {user?.role === "ADMIN" && (
            <button
              onClick={() => navigate("/admin")}
              className="rounded-lg text-heading bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
            >
              Admin
            </button>
          )}

          <button
            onClick={handleLogout}
            className="rounded-lg text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-base text-sm px-4 py-2.5 text-center leading-5"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <MenuCard title="Burgers">
            <BurgerSection />
          </MenuCard>
          <MenuCard title="Fruit Soda">
            <FruitSodaSection />
          </MenuCard>
          <MenuCard title="Fries">
            <FriesSection />
          </MenuCard>
          <MenuCard title="Milkshake">
            <MilkshakeSection />
          </MenuCard>
          <MenuCard title="Combos">
            <ComboSection />
          </MenuCard>
          <MenuCard title="Frappe">
            <FrappeSection />
          </MenuCard>
          <MenuCard title="HamSandwich">
            <HamSandwichSection />
          </MenuCard>
          <MenuCard title="IceCoffee">
            <IceCoffeeSection />
          </MenuCard>
        </div>

        <aside className="lg:sticky lg:top-20 lg:self-start">
          <CartPanel />
        </aside>
      </div>
    </main>
  );
}

function MenuCard({ title, children }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-semibold text-gray-800">{title}</h2>
      {children}
    </div>
  );
}
