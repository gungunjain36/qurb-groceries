import React, { createContext, useContext, useState, useEffect } from "react";
import { applyOffers } from "../utils/calculateOffers";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id && !c.isFree);
      if (exists) {
        return applyOffers(
          prev.map((c) =>
            c.id === item.id && !c.isFree ? { ...c, qty: c.qty + qty } : c
          )
        );
      }
      return applyOffers([...prev, { ...item, qty }]);
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => {
      const updated = prev.map((c) =>
        c.id === id && !c.isFree ? { ...c, qty: Math.max(1, qty) } : c
      );
      return applyOffers(updated);
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      return applyOffers(updated);
    });
  };

  const emptyCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQty, removeFromCart, emptyCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCartCtx() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartCtx must be used within a CartProvider");
  }
  return context;
}

export default CartContext;