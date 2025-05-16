import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";

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
  // for demo, all favs are local only
  const [favIds, setFavIds] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all")
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (category === "all" || p.type === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Category filter row */}
      <div className="mt-6 flex flex-wrap gap-3">
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
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-4">
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
  );
}
