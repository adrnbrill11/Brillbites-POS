import { useState } from "react";
import menuItems from "../data/menuItems.js";
import useCartStore from "../store/cartStore.js";

export default function IceCoffeeSection() {
  const [flavor, setFlavor] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const IceCoffeeItems = menuItems.filter((item) => item.type === "IceCoffee");

  const selectedItem = IceCoffeeItems.find((item) => item.flavor === flavor);

  return (
    <div className="flex flex-col gap 3">
      {/*Flavors*/}
      <select
        value={flavor}
        onChange={(e) => setFlavor(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
      >
        <option value="">Select Flavor</option>
        {IceCoffeeItems.map((item) => (
          <option key={item.id} value={item.flavor}>
            {item.flavor} - ₱{item.price}
          </option>
        ))}
      </select>

      {selectedItem && (
        <>
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm flex justify-between">
            <span className="font-medium">
              IceCoffee 160z - {selectedItem.flavor}
            </span>
            <span className="font-small">₱{selectedItem.price}</span>
            <div>
           
            </div>
          </div>
             <button
                onClick={() => {
                  addItem(selectedItem);
                  setFlavor("");
                }}
                className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-all"
              >
                Add to Cart
              </button>
        </>
      )}
    </div>
  );
}
