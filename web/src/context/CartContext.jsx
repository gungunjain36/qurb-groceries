import { createContext, useContext, useState, useEffect } from 'react';
import { applyOffers } from '../utils/calculateOffers';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id && !item.isFree);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && !item.isFree
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && !item.isFree
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const updatedCart = applyOffers(cartItems);

  const subtotal = updatedCart.reduce(
    (sum, item) => sum + (item.price * item.quantity || 0),
    0
  );
  const discount = updatedCart.reduce(
    (sum, item) => sum + (item.isFree ? item.originalPrice * item.quantity : 0),
    0
  );
  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        cartItems: updatedCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        subtotal,
        discount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);