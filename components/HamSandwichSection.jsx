import { useState } from "react";
import useCartStore from "../store/cartStore";
import menuItems from "../data/menuItems";

export default function HamSandwichSection() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const addItem = useCartStore((state) => state.addItem);

  const hamSandwichItems = menuItems.filter(
    (item) => item.type === "HamSandwich"
  );
  const addOnItems = menuItems.filter((item) => item.type === "addOns");

  const slctType = [
    ...new Set(hamSandwichItems.map((item) => item.selectedType)),
  ];

  const addOnsTotal = selectedOptions.reduce((sum, addOn) => sum + addOn.price, 0)

  function toggleAddOn(addOn) {
    setSelectedOptions((prev) =>
      prev.find((a) => a.id === addOn.id)
        ? prev.filter((a) => a.id !== addOn.id)
        : [...prev, addOn]
    );
  }

  const selectedItem = hamSandwichItems.find(
    (item) => item.selectedType === selectedType
  );

  const cartItem = selectedItem && {
    ...selectedItem,
    addOns: selectedOptions,
    price: selectedItem.price + addOnsTotal,
  };

  return (
    <div className="flex flex-col gap-3">
      {/*Variant dropdown */}
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-gray-800"
      >
        <option value="">Select Ham Sandwich</option>
        {slctType.map((s) => (
          <option key={s} value={s}>
            {s} - ₱
            {hamSandwichItems.find((item) => item.selectedType === s)?.price}
          </option>
        ))}
      </select>

      {/*Checkbox AddOns*/}

      {selectedType && (
        <div className="flex flex-col gap-2">
          {addOnItems.map((addOn) => (
            <label key={addOn.id} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={selectedOptions.some((a) => a.id === addOn.id)}
                onChange={() => toggleAddOn(addOn)}
              />
              {addOn.name} - ₱{addOn.price}
            </label>
          ))}
        </div>
      )}

      {/*Preview Selected Item */}
      <>
        {selectedItem && (
          <>
            <div className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm flex justify-between">
              <span className="font-medium">
                {selectedItem.selectedType} -{" "}
                {selectedOptions.length > 0 && (
                  <span className="text-gray-500">
                    + {selectedOptions.map((o) => o.name).join(", ")}
                  </span>
                )}
              </span>
              <span className="font-small">₱{cartItem.price}</span>
            </div>
            <button
              onClick={() => {
                addItem(cartItem);
                setSelectedType("");
                setSelectedOptions([]);
              }}
              className="bg-gray-800 text-white rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-700 transition-all"
            >
              + Add to Cart
            </button>
          </>
        )}
      </>
    </div>
  );
}
