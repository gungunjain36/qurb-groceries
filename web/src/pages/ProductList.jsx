import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";
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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cart, addToCart } = useCart();
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }, []);

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
                  : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100"
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
                onFavToggle={() =>
                  setFavIds((ids) =>
                    ids.includes(p.id)
                      ? ids.filter((id) => id !== p.id)
                      : [...ids, p.id]
                  )
                }
                onCartToggle={() => addToCart(p, 1)}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}