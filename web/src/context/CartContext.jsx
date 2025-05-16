import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Adds product with quantity (default 1)
  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id);
      if (exists) {
        return prev.map((c) =>
          c.id === item.id ? { ...c, qty: c.qty + qty } : c
        );
      }
      return [...prev, { ...item, qty }];
    });
  };

  // Update quantity
  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((c) => (c.id === id ? { ...c, qty: Math.max(1, qty) } : c))
    );
  };

  // Remove item
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  // Empty
  const emptyCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQty, removeFromCart, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartCtx() {
  return useContext(CartContext);
}
export default CartContext;