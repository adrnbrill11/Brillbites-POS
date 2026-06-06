import { useState } from "react";
import menuItems from "../data/menuItems";
import useCartStore from "../store/cartStore";

export default function FriesSection() {
  const [size, setSize] = useState("");
  const [flavor, setFlavor] = useState("");
  const addItem = useCartStore((state) => state.addItem);

  const friesItems = menuItems.filter((item) => item.type === "Fries");
  const sizes = [...new Set(friesItems.map((item) => item.size))];

  const flavors = friesItems
    .filter((item) => item.size === size)
    .map((item) => item.flavor);

  const selectedItem = friesItems.find(
    (item) => item.size === size && item.flavor === flavor
  );

  return (
    <div className="flex flex-col gap-3">
      {/*Size dropdown*/}
      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
      >
        <option value="">Select Size</option>
        {sizes.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      {/*Flavor dropdown*/}
      {size && (
        <select
          value={flavor}
          onChange={(e) => setFlavor(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          <option value="">Select Flavor</option>
        {flavors.map((f) => (
          <option key={f} value={f}>
              {f} - ₱
              {
                friesItems.find(
                  (item) => item.size === size && item.flavor === f
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
            <span className="font-medium">{selectedItem.size}  (Fries) - {selectedItem.flavor}</span>
            <span className="font-small">₱{selectedItem.price}</span>
          </div>
          <button
            onClick={() => {
              addItem(selectedItem);
              setSize("");
              setFlavor("");
            }}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-all"
          >
            + Add to Cart
          </button>
        </>
      )}
    </div>
  );
}
