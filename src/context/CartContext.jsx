import React, { createContext, useContext, useState } from "react";
import { applyOffers } from "../utils/calculateOffers";
import { useProducts } from "./ProductContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { products } = useProducts();
  const [cart, setCart] = useState([]);
  const [appliedOffers, setAppliedOffers] = useState([]);

  const addToCart = (item, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((c) => c.id === item.id && !c.isFree);
      const newCart = exists
        ? prev.map((c) =>
            c.id === item.id && !c.isFree ? { ...c, qty: c.qty + qty } : c
          )
        : [...prev, { ...item, qty }];
      const { updatedCart, appliedOffers } = applyOffers(newCart, products);
      console.log("After addToCart - Updated Cart:", updatedCart);
      console.log("After addToCart - Applied Offers:", appliedOffers);
      setAppliedOffers(appliedOffers);
      return updatedCart;
    });
  };

  const updateQty = (id, qty) => {
    setCart((prev) => {
      // Find the product to get its availability
      const product = products.find((p) => p.id === id);
      const available = product ? product.available : 0;
      // Cap the quantity at the available stock, with a minimum of 1
      const newQty = Math.min(Math.max(1, qty), available);
      const updated = prev.map((c) =>
        c.id === id && !c.isFree ? { ...c, qty: newQty } : c
      );
      const { updatedCart, appliedOffers } = applyOffers(updated, products);
      console.log("After updateQty - Updated Cart:", updatedCart);
      console.log("After updateQty - Applied Offers:", appliedOffers);
      setAppliedOffers(appliedOffers);
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      const { updatedCart, appliedOffers } = applyOffers(updated, products);
      console.log("After removeFromCart - Updated Cart:", updatedCart);
      console.log("After removeFromCart - Applied Offers:", appliedOffers);
      setAppliedOffers(appliedOffers);
      return updatedCart;
    });
  };

  const emptyCart = () => {
    setCart([]);
    setAppliedOffers([]);
    console.log("Cart emptied.");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        appliedOffers,
        addToCart,
        updateQty,
        removeFromCart,
        emptyCart,
      }}
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