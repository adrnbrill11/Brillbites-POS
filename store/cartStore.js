import { create } from 'zustand'

const useCartStore = create((set) => ({
    items: [],

    addItem: (product) => set((state) => {
        const existingItem = state.items.find(i => i.id === product.id)
        if(existingItem){
            return {
                items: state.items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1} : i)
            }
        }
        return {items: [...state.items, {...product, quantity: 1}]}
    }),

    removeItem: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
    })),

    increaseItem: (id) => set((state) => ({
        items: state.items.map(i => i.id === id ?{ ... i, quantity: i.quantity + 1 } : i)
    })),

    decreaseItem: (id) => set((state) => ({
        items: state.items.map(i => i.id === id ?{ ... i, quantity: i.quantity - 1} : i).filter(i => i.quantity > 0)
    })),

    clearCart: () => set({items: []}),

 

    
}));

export default useCartStore;
