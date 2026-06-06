import { create } from "zustand"

const useTransactionStore = create((set) => ({
    transactions: JSON.parse(localStorage.getItem("transactions")) || [],
    addTransaction: (transactions) => set((state) => {
        const updated = [...state.transactions, transactions]
        localStorage.setItem("transactions", JSON.stringify(updated))
        return {transactions: updated}
    }),

    clearTransactions: () => {
        localStorage.removeItem("transactions")
        set({transactions: []})
    }
}))

export default useTransactionStore