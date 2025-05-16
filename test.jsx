import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiSearch, FiFilter, FiHeart, FiShoppingCart } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";

const CATEGORIES = [
  { label: "All items", value: "all" },
  { label: "Drinks", value: "drinks" },
  { label: "Fruit", value: "fruit" },
  { label: "Bakery", value: "bakery" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
      {count}
    </span>
  );
}

const avatarUrl = "https://randomuser.me/api/portraits/men/75.jpg";

export default function App() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favIds, setFavIds] = useState<number[]>([]);
  const [cartIds, setCartIds] = useState<number[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://uxdlyqjm9i.execute-api.eu-west-1.amazonaws.com/s?category=all"
      )
      .then((res) => setProducts(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      (category === "all" || p.type === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-2 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-[2rem] shadow px-4 md:px-10 py-8 relative">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Left: Logo */}
          <div className="flex items-center font-extrabold text-lg md:text-xl mr-2">
            GROCERIES
          </div>
          {/* Search Input + filter*/}
          <div className="flex-1 flex items-center relative max-w-xl md:mx-6">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-12 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:border-gray-400 outline-none transition text-base"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600">
              <FiFilter size={21} />
            </button>
          </div>
          {/* Right: Icons*/}
          <div className="flex items-center justify-end gap-5 md:min-w-[196px] ml-auto">
            <div className="relative group">
              <FiHeart size={26} className="text-gray-400 hover:text-red-400 cursor-pointer" />
              <Badge count={favIds.length || 1} />
            </div>
            <div className="relative">
              <img
                src={avatarUrl}
                alt="User"
                className="w-8 h-8 rounded-full border-2 border-white drop-shadow-md object-cover"
              />
            </div>
            <div className="relative group">
              <FiShoppingCart
                size={26}
                className="text-gray-400 hover:text-black cursor-pointer"
              />
              <Badge count={cartIds.length || 1} />
            </div>
          </div>
        </div>
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
                isFav={favIds.includes(p.id)}
                isCart={cartIds.includes(p.id)}
                onFavToggle={() =>
                  setFavIds((ids) =>
                    ids.includes(p.id)
                      ? ids.filter((id) => id !== p.id)
                      : [...ids, p.id]
                  )
                }
                onCartToggle={() =>
                  setCartIds((ids) =>
                    ids.includes(p.id)
                      ? ids.filter((id) => id !== p.id)
                      : [...ids, p.id]
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({
  product,
  isFav,
  isCart,
  onFavToggle,
  onCartToggle,
}: {
  product: any;
  isFav: boolean;
  isCart: boolean;
  onFavToggle: () => void;
  onCartToggle: () => void;
}) {
  // Tag logic — only 5 left or available
  let tag = null;
  if (product.available <= 5) {
    tag = (
      <span className="px-3 py-1 text-xs rounded-xl bg-orange-100 text-orange-600 font-semibold">Only {product.available} left</span>
    );
  } else {
    tag = (
      <span className="px-3 py-1 text-xs rounded-xl bg-green-100 text-green-600 font-semibold">Available</span>
    );
  }
  return (
    <div className="flex flex-row bg-white rounded-2xl shadow transition hover:shadow-lg p-5 gap-3 items-center min-h-[160px]">
      <img
        src={product.img}
        alt={product.name}
        className="w-28 h-24 object-contain rounded-xl bg-gray-50 flex-shrink-0"
      />
      <div className="flex-1 min-w-0 flex flex-col h-full">
        <div className="flex items-start mb-1">
          <span className="font-semibold text-lg text-gray-800 mr-2 max-w-[150px] truncate block">
            {product.name}
          </span>
        </div>
        <span className="text-gray-500 text-[13px] leading-tight mb-2 block line-clamp-2">{product.description}</span>
        {tag}
        <div className="flex items-end justify-between mt-auto pt-6">
          <span className="text-black font-bold text-base">{product.price}</span>
          <div className="flex items-center gap-4">
            <button onClick={onCartToggle} className={classNames(
              "transition-colors", isCart ? "text-black" : "text-gray-400 hover:text-black"
            )}>
              <FiShoppingCart size={22} />
            </button>
            <button onClick={onFavToggle} className={classNames(
              "transition-colors", isFav ? "text-red-400" : "text-gray-400 hover:text-red-400"
            )}>
              <FiHeart size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
