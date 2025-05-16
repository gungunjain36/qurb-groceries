import React, { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Initialize favIds from localStorage
  const [favIds, setFavIds] = useState(() => {
    const savedFavs = localStorage.getItem("favIds");
    return savedFavs ? JSON.parse(savedFavs) : [];
  });

  // Save favIds to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("favIds", JSON.stringify(favIds));
  }, [favIds]);

  // Toggle a product ID in favIds
  const toggleFavorite = (id) => {
    setFavIds((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  return (
    <FavoritesContext.Provider value={{ favIds, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}

export default FavoritesContext;