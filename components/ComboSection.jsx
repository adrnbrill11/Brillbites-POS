import { useState } from "react";
import useCartStore from "../store/cartStore";

export default function ComboSection() {
  const COMBO_DATA = {
    "Combo A": { fries: "Medium Fries", drinkSize: "16oz", price: 135 },
    "Combo B": { fries: "Large Fries", drinkSize: "22oz", price: 170 },
  };

  const MAINS = ["Cheese Burger", "Hotdog Buns"];
  const FRIES_FLAVORS = ["Cheese", "BBQ", "Sour Cream"];
  const DRINKS = ["Fruit Soda", "Milkshake"];
  const DRINK_FLAVORS = {
    "Fruit Soda": [
      "Strawberry",
      "Mango",
      "Lychee",
      "Bubblegum",
      "Blueberry",
      "Green Apple",
      "Grapes",
      "Orange",
    ],
    Milkshake: [
      "Caramel Macchiato",
      "Cookies and Cream",
      "Coffee Crumble",
      "Double Dutch",
      "Choco Fudge",
      "Buko Pandan",
      "Rocky Road",
      "Strawberry",
      "Leche Flan",
      "Avocado",
      "Mango",
    ],
  };

  const [combo, setCombo] = useState("");
  const [main, setMain] = useState("");
  const [friesFlavor, setFriesFlavor] = useState("");
  const [drink, setDrink] = useState("");
  const [drinkFlavor, setDrinkFlavor] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const selectedItem = combo && main && friesFlavor && drink && drinkFlavor 
  ? {
      id: `${combo}-${main}-${friesFlavor}-${drink}-${drinkFlavor}`,
      name: `${combo} - ${main} + ${COMBO_DATA[combo].fries} (${friesFlavor}) + ${drink} ${drinkFlavor} ${COMBO_DATA[combo].drinkSize}`,
      combo,
      main,
      fries: COMBO_DATA[combo]?.fries,
      friesFlavor,
      drink,
      drinkFlavor,
      size: COMBO_DATA[combo]?.drinkSize,
      price: COMBO_DATA[combo]?.price,    
  }
  : null

 return (
  <div className="flex flex-col gap-3">

    {/* Combo dropdown */}
    <select value={combo} onChange={(e) => {setCombo(e.target.value); setMain(""); setFriesFlavor(""); setDrink(""); setDrinkFlavor("")}}
      className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800">
      <option value="">Select Combo</option>
      {Object.keys(COMBO_DATA).map((c) => (
        <option key={c} value={c}>{c} - ₱{COMBO_DATA[c].price}</option>
      ))}
    </select>

    {/* Main dropdown */}
    {combo && (
      <select value={main} onChange={(e) => {setMain(e.target.value); setFriesFlavor(""); setDrink(""); setDrinkFlavor("")}}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800">
        <option value="">Select Main</option>
        {MAINS.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
    )}

    {/* Fries Flavor dropdown */}
    {main && (
      <select value={friesFlavor} onChange={(e) => {setFriesFlavor(e.target.value); setDrink(""); setDrinkFlavor("")}}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800">
        <option value="">Select Fries Flavor</option>
        {FRIES_FLAVORS.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
    )}

    {/* Drink dropdown */}
    {friesFlavor && (
      <select value={drink} onChange={(e) => {setDrink(e.target.value); setDrinkFlavor("")}}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800">
        <option value="">Select Drink</option>
        {DRINKS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    )}

    {/* Drink Flavor dropdown */}
    {drink && (
      <select value={drinkFlavor} onChange={(e) => setDrinkFlavor(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800">
        <option value="">Select Drink Flavor</option>
        {DRINK_FLAVORS[drink].map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
    )}

    {/* Preview + Add button */}
    {selectedItem && (
      <>
        <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm flex justify-between">
          <span className="font-medium">{selectedItem.name}</span>
          <span className="font-bold">₱{selectedItem.price}</span>
        </div>
        <button
          onClick={() => {
            addItem(selectedItem)
            setCombo(""); setMain(""); setFriesFlavor(""); setDrink(""); setDrinkFlavor("")
          }}
          className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-all">
          + Add to Cart
        </button>
      </>
    )}

  </div>
)
}
