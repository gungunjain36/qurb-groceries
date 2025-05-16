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
  const { cart, addToCart } = useCart();
  const { favIds, toggleFavorite } = useFavorites();

  const filteredProducts = products.filter((p) => {
    const name = p.name || "";
    const type = p.type || "";
    return (
      (category === "all" || type === category) &&
      name.toLowerCase().includes(search.trim().toLowerCase())
    );
  });

  return (
    <Layout
      searchBar={
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
        />
      }
    >
      <div className="mt-6">
        {/* Category filter row */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={classNames(
                "px-6 py-2 rounded-full border",
                category === c.value
                  ? "bg-black text-white border-black shadow-sm"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hadow-lg"
              )}
            >
              {c.label}
            </button>
          ))}
        </div>
        {/* Trending header */}
        <div className="mt-7 mb-4 font-bold text-xl text-gray-700">Trending Items</div>
        {/* Product grid */}
        {loading ? (
          <div className="text-gray-400 text-center mt-16">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-gray-400 text-center mt-16">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isCart={cart.some((item) => item.id === p.id)}
                isFav={favIds.includes(p.id)}
                onFavToggle={() => toggleFavorite(p.id)}
                onCartToggle={() => addToCart(p, 1)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}