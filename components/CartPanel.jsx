import useCartStore from "../store/cartStore";
import useTransactionStore from "../store/transactionStore";
import { useState } from "react";
import api from "../api/api"

export default function CartPanel() {
  const { items, removeItem, clearCart, increaseItem, decreaseItem } = useCartStore();
  const [tendered, setTendered] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  //Order Number
  const orderNumber = useTransactionStore(
    (state) => `#${String(state.transactions.length + 1).padStart(3, "0")}`
  );

  //Computation

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;
  const change = tendered ? parseFloat(tendered) - total : 0;

  //Handle Charge function
async function handleCharge() {
  try {
    console.log("CHECKOUT ITEMS:", items)

    await api.post("/orders", {
      items: items.map(i => ({
        id: i.id,
        name: i.name,
        quantity: Number(i.quantity),
        price: Number(i.price),
      })),
      total: parseFloat(total.toFixed(2)),
      paymentMethod,
    })

    clearCart()
    setPaymentMethod("")
    setTendered("")

  } catch (error) {
    console.error("Order failed:", error.response?.data || error)
    alert(error.response?.data?.error || error.response?.data?.message || "Order failed! Please try again.")
  }
}

  function printReceipt() {
    window.print();
  }

  return (
    <div className="flex flex-col gap-4 bg-white border-gray-200 rounded-xl p-4">
      {/*Header*/}
      <h2 className="font-medium text-gray-800 text-sm border-b border-gray-200 pb-3">
        Current Order
      </h2>

      {/*Empty state*/}
      {items.length === 0 && (
        <p className="text-center text-gray-400 text-sm py-6">
          No Items yet - Add something!
        </p>
      )}

      {/*Item List*/}
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center text-sm"
          >
            <div>
              <p className="font-medium text-gray-800">{item.name}</p>

              {item.addOns?.length > 0 && (
                <p className="text-gray-400 text-xs">
                  {item.addOns.map((addOn) => addOn.name).join(", ")}
                </p>
              )}
              <p className="text-gray-400 text-xs">
                x{item.quantity} . ₱{item.price}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => decreaseItem(item.id)}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                -
              </button>
              <span className="text-xs font-medium">{item.quantity}</span>
              <button
                onClick={() => increaseItem(item.id)}
                className="border border-gray-300 rounded px-2 py-1 text-xs"
              >
                +
              </button>
              <span className="text-xs font-medium"></span>
              <span className="font-medium text-gray-800">
                ₱{item.price * item.quantity}
              </span>
              <button
                onClick={() => removeItem(item.id)}
                className="text-red-400 hover:text-red-600 text-xs border border-red-200 rounded px-2 py-1"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*Totals*/}

      {items.length > 0 && (
        <>
          <div className="border-t border-gray-200 pt-3 flex flex-col gap-1 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Total</span>
              <span>₱{total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}

      {/*Payment Method*/}

      <div className="flex gap-2">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`flex-1 py-2 rounded-lg text-sm border transition-all ${
            paymentMethod === "Cash"
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 text-gray-600"
          }`}
        >
          CASH
        </button>
        <button
          onClick={() => setPaymentMethod("GCash")}
          className={`flex-1 py-2 rounded-lg text-sm border transition-all ${
            paymentMethod === "GCash"
              ? "bg-blue-600 text-white border-blue-600"
              : "border-gray-300 text-gray-600"
          }`}
        >
          GCASH
        </button>
      </div>

      {/*Tendered*/}

      {paymentMethod === "Cash" && (
        <div className="flex flex-col gap-2">
          <input
            type="number"
            placeholder="Enter tendered amount"
            value={tendered}
            onChange={(e) => setTendered(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
          />
          {tendered && change >= 0 && (
            <div className="flex justify-between text-sm font-medium text-green-600">
              <span>Change</span>
              <span>₱{change.toFixed(2)}</span>
            </div>
          )}
          {tendered && change < 0 && (
            <p className="text-red-500 text-sm">
              Insufficient amount - ₱{Math.abs(change).toFixed(2)} kulang!
            </p>
          )}
        </div>
      )}

      {/*Charge + Clear buttons*/}

      <div className="flex gap-2">
        <button
          onClick={printReceipt}
          disabled={items.length === 0}
          className="flex-1 border border-gray-300 text-gray-600 rounded-lg py-2 text-sm hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Print Receipt
        </button>

        <button
          onClick={handleCharge}
          disabled={!paymentMethod || (paymentMethod === "Cash" && change < 0)}
          className="flex-1 bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Charge ₱{total.toFixed(2)}
        </button>
      </div>

      <button
        onClick={clearCart}
        className="border border-gray-300 text-gray-500 rounded-lg py-2 text-sm hover:bg-gray-50 transition-all"
      >
        Clear Order
      </button>

      {/* Hidden receipt*/}
      <div id="receipt" className="hidden print:block text-xs p-4">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-lg font-bold">BrillBites</h1>
          <p>{orderNumber}</p>
          <p>{new Date().toLocaleDateString()}</p>
          <p>{new Date().toLocaleTimeString()}</p>
        </div>

        <hr className="my-2" />

        {/* Items */}
        <div className="mb-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.name} x{item.quantity}
              </span>
              <span>₱{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <hr className="my-2" />

        {/* Totals */}
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₱{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>₱{total.toFixed(2)}</span>
        </div>

        <hr className="my-2" />

        {/* Payment */}
        <div className="flex justify-between">
          <span>Payment</span>
          <span>{paymentMethod}</span>
        </div>
        {paymentMethod === "Cash" && (
          <>
            <div className="flex justify-between">
              <span>Tendered</span>
              <span>₱{parseFloat(tendered).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Change</span>
              <span>₱{change.toFixed(2)}</span>
            </div>
          </>
        )}

        <hr className="my-2" />

        {/* Footer */}
        <div className="text-center mt-4">
          <p>Thank you for dining with us!</p>
          <p>Please come again! 😊</p>
        </div>
      </div>
    </div>
  );
}
