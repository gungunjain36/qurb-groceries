import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";
import { useFavorites } from "../context/FavouritesContext";
import { useProducts } from "../context/ProductContext";
import Layout from "../components/Layout";

const CATEGORIES = [
  { label: "All items", value: "all" },
  { label: "Drinks", value: "drinks" },
  { label: "Fruit", value: "fruit" },
  { label: "Bakery", value: "bakery" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductList() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const { products, loading } = useProducts();
  const { cart, addToCart, removeFromCart } = useCart();
  const { favIds, toggleFavorite } = useFavorites();

  const filteredProducts = products.filter((p) => {
    const name = p.name || "";
    const type = p.type || "";
    return (
      (category === "all" || type === category) &&
      name.toLowerCase().includes(search.trim().toLowerCase())
    );
  });

  const handleCartToggle = (product, isInCart) => {
    if (isInCart) {
      removeFromCart(product.id);
    } else if (product.available > 0) {
      addToCart(product, 1);
    }
  };

  return (
    <Layout
      favIds={favIds}
      searchBar={
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
        />
      }
    >
      <div className="mt-4 sm:mt-6">
        {/* Category filter row */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              type="button"
              className={classNames(
                "px-4 py-1.5 rounded-full border text-left sm:text-center text-sm w-full sm:w-auto",
                category === c.value
                  ? "bg-gray-100 text-gray-800 border-gray-200"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        {/* Trending header */}
        <div className="mt-6 sm:mt-7 mb-3 sm:mb-4 font-bold text-lg text-gray-800">
          Trending Items
        </div>
        {/* Product grid */}
        {loading ? (
          <div className="text-gray-400 text-center mt-8">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-gray-400 text-center mt-8">No products found</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pb-4 justify-items-start">
            {filteredProducts.map((p) => {
              const isInCart = cart.some((item) => item.id === p.id);
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  isCart={isInCart}
                  isFav={favIds.includes(p.id)}
                  onFavToggle={() => toggleFavorite(p.id)}
                  onCartToggle={() => handleCartToggle(p, isInCart)}
                />
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}