import { useState } from "react";
import menuItems from "../data/menuItems";
import useCartStore from "../store/cartStore";

export default function BurgerSection() {
  const [variant, setVariant] = useState("");
  const [deal, setDeal] = useState("");

  const addItem = useCartStore((state) => state.addItem);

  const burgerItems = menuItems.filter((item) => item.type === "Burger");
  const variants = [...new Set(burgerItems.map((item) => item.variant))];

  const deals = burgerItems
    .filter((item) => item.variant === variant)
    .map((item) => item.deal);

  const selectedItem = burgerItems.find(
    (item) => item.variant === variant && item.deal === deal
  );
  
  return (
    <div className="flex flex-col gap-3">
      {/*Variant dropdown*/}

      <select
        value={variant}
        onChange={(e) => setVariant(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
      >
        <option value="">Select Burger</option>
        {variants.map((v) => (
          <option key={v} value={v}>
            {v}
          </option>
        ))}
      </select>

      {/*Deal dropdown*/}

      {variant && (
        <select
          value={deal}
          onChange={(e) => setDeal(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          <option value="">Select Deal</option>
        {deals.map((d) => (
          <option key={d} value={d}>
              {d} - ₱
              {
                burgerItems.find(
                  (item) => item.variant === variant && item.deal === d
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
            <span className="font-medium">{selectedItem.name}</span>
            <span className="font-bold">₱{selectedItem.price}</span>
          </div>
          <button
            onClick={() => {
              addItem(selectedItem);
              setVariant("");
              setDeal("");
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
