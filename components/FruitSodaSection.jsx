import { useState } from "react";
import menuItems from "../data/menuItems";
import useCartStore from "../store/cartStore";

export default function FruitSodaSection() {
  const [flavor, setFlavor] = useState("");
  const [size, setSize] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const FruitSodaItems = menuItems.filter((item) => item.type === "Fruit Soda");
  const flavors = [...new Set(FruitSodaItems.map((item) => item.flavor))];

  const sizes = FruitSodaItems.filter((item) => item.flavor === flavor).map(
    (item) => item.size);

  const selectedItem = FruitSodaItems.find(
    (item) => item.flavor === flavor && item.size === size
  );

  return (
    <div className="flex flex-col gap-3">
      {/*Flavors dropdown*/}

      <select
        value={flavor}
        onChange={(e) => setFlavor(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
      >
        <option value="">Select Flavor</option>
        {flavors.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      {/*Size dropdown*/}

      {flavor && (
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          <option value="">Select Size</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s} - ₱
              {
                FruitSodaItems.find(
                  (item) => item.flavor === flavor && item.size === s
                )?.price
              }
            </option>
          ))}
        </select>
      )}

      {/*Preview + add button*/}

      {selectedItem && (
        <>
          <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm flex justify-between">
            <span className="font-medium">
              {selectedItem.size} (FruitSoda) - {selectedItem.flavor}
            </span>
            <span className="font-small">₱{selectedItem.price}</span>
          </div>
          <button
            onClick={() => {
              addItem(selectedItem);
              setFlavor("");
              setSize("");
            }}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-all">+ Add to Cart</button>
        </>
      )}
    </div>
  );
}
