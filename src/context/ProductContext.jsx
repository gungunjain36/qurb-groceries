import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all")
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Invalid API response: Expected an array");
          setProducts([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setProducts([]);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

export default ProductContext;