import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: (cartItem.quantity || 0) + 1 } : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCartItems(prevItems => prevItems.filter(cartItem => cartItem.id !== item.id));
  };

  const updateQuantity = (item, delta) => {
    setCartItems(prevItems =>
      prevItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + delta) } : cartItem
      )
    );
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Offer Logic
  const applyOffers = (items) => {
    const updatedItems = [...items];
    const cocaColaCount = updatedItems.filter(item => item.name.toLowerCase().includes('coca-cola')).reduce((sum, item) => sum + (item.quantity || 0), 0);
    const croissantCount = updatedItems.filter(item => item.name.toLowerCase().includes('croissant')).reduce((sum, item) => sum + (item.quantity || 0), 0);

    // Coca-Cola Offer
    const freeCokesToAdd = Math.floor(cocaColaCount / 6);
    const existingFreeCokes = updatedItems.filter(item => item.name === 'Free Coca-Cola');
    const diffCokes = freeCokesToAdd - existingFreeCokes.length;

    if (diffCokes > 0) {
      for (let i = 0; i < diffCokes; i++) {
        updatedItems.push({ id: `free-coke-${Date.now() + i}`, name: 'Free Coca-Cola', price: 0, isFree: true });
      }
    } else if (diffCokes < 0) {
      for (let i = 0; i < Math.abs(diffCokes); i++) {
        const index = updatedItems.findIndex(item => item.name === 'Free Coca-Cola');
        if (index !== -1) {
          updatedItems.splice(index, 1);
        }
      }
    }

    // Croissant & Coffee Offer (assuming a product named 'coffee' exists)
    const freeCoffeesToAdd = Math.floor(croissantCount / 3);
    const existingFreeCoffees = updatedItems.filter(item => item.name === 'Free Coffee');
    const diffCoffees = freeCoffeesToAdd - existingFreeCoffees.length;

    if (diffCoffees > 0) {
      for (let i = 0; i < diffCoffees; i++) {
        updatedItems.push({ id: `free-coffee-${Date.now() + i + freeCokesToAdd}`, name: 'Free Coffee', price: 0, isFree: true });
      }
    } else if (diffCoffees < 0) {
      for (let i = 0; i < Math.abs(diffCoffees); i++) {
        const index = updatedItems.findIndex(item => item.name === 'Free Coffee');
        if (index !== -1) {
          updatedItems.splice(index, 1);
        }
      }
    }

    return updatedItems;
  };

  useEffect(() => {
    setCartItems(applyOffers(cartItems));
  }, [cartItems]);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);