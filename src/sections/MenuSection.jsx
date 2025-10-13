// src/sections/MenuSection.jsx
import { useMemo, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "../context/CartContext"

// ---- Sample data (edit freely) ----
const dishes = [
  { name: "Paneer Tikka", price: 220, category: "Starters", img: "/images/paneer-tikka.jpg", tags: ["veg", "spicy"], popularity: 92 },
  { name: "Masala Dosa", price: 180, category: "South Indian", img: "/images/dosa.jpg", tags: ["veg"], popularity: 88 },
  { name: "Veg Biryani", price: 250, category: "Main Course", img: "/images/biryani.jpg", tags: ["veg"], popularity: 81 },
  { name: "Butter Chicken", price: 320, category: "Main Course", img: "/images/butter-chicken.jpg", tags: ["non-veg"], popularity: 95 },
  { name: "Cold Coffee", price: 120, category: "Beverages", img: "/images/coffee.jpg", tags: ["veg"], popularity: 76 },
  { name: "Chocolate Lava Cake", price: 160, category: "Desserts", img: "/images/lava.jpg", tags: ["veg", "sweet"], popularity: 85 },
  // add more...
]

// ---- Helpers ----
const toRupee = (n) => `₹${n.toLocaleString("en-IN")}`
const getType = (tags = []) => (tags.includes("non-veg") ? "Non-Veg" : "Veg")

export default function MenuSection() {
  const { addToCart } = useCart() // ✅ use global cart

  // Controls
  const [filterCat, setFilterCat] = useState("All")
  const [query, setQuery] = useState("")
  const [debounced, setDebounced] = useState("")
  const [type, setType] = useState("All") // All | Veg | Non-Veg
  const [sortBy, setSortBy] = useState("pop-desc") // pop-desc | price-asc | price-desc | name-asc | name-desc

  // Price range
  const minPrice = useMemo(() => Math.min(...dishes.map((d) => d.price)), [])
  const maxPrice = useMemo(() => Math.max(...dishes.map((d) => d.price)), [])
  const [minVal, setMinVal] = useState(minPrice)
  const [maxVal, setMaxVal] = useState(maxPrice)

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 250)
    return () => clearTimeout(t)
  }, [query])

  const categories = useMemo(() => ["All", ...Array.from(new Set(dishes.map(d => d.category)))], [])

  // Filter + sort pipeline
  const filtered = useMemo(() => {
    let arr = dishes.slice()

    if (filterCat !== "All") arr = arr.filter(d => d.category === filterCat)
    if (type !== "All") arr = arr.filter(d => getType(d.tags) === type)
    arr = arr.filter(d => d.price >= minVal && d.price <= maxVal)

    if (debounced) {
      arr = arr.filter(d =>
        d.name.toLowerCase().includes(debounced) ||
        d.category.toLowerCase().includes(debounced) ||
        (d.tags || []).some(t => t.toLowerCase().includes(debounced))
      )
    }

    arr.sort((a, b) => {
      switch (sortBy) {
        case "price-asc": return a.price - b.price
        case "price-desc": return b.price - a.price
        case "name-asc": return a.name.localeCompare(b.name)
        case "name-desc": return b.name.localeCompare(a.name)
        case "pop-desc": default: return (b.popularity ?? 0) - (a.popularity ?? 0)
      }
    })

    return arr
  }, [filterCat, type, minVal, maxVal, debounced, sortBy])

  // Keep sliders from crossing
  const handleMinChange = (v) => setMinVal(Math.min(Number(v), maxVal))
  const handleMaxChange = (v) => setMaxVal(Math.max(Number(v), minVal))

  return (
    <section id="menu" className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_25%_20%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(700px_circle_at_80%_60%,rgba(132,204,22,0.12),transparent_60%)]" />

      <div className="relative container mx-auto px-6">
        <motion.h2
          className="text-center text-4xl md:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-300"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          Our Futuristic Menu
        </motion.h2>

        {/* Controls */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {/* Search */}
          <input
            type="text"
            placeholder="Search dishes, categories, tags…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 text-gray-100 placeholder-gray-400 border border-emerald-400/20 focus:outline-none focus:border-emerald-400 transition"
            aria-label="Search menu"
          />

          {/* Category */}
          <select
            value={filterCat}
            onChange={(e) => setFilterCat(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-emerald-400/20 text-gray-100 focus:outline-none focus:border-emerald-400"
            aria-label="Filter category"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Veg/Non-Veg */}
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-emerald-400/20 text-gray-100 focus:outline-none focus:border-emerald-400"
            aria-label="Veg or Non-Veg"
          >
            <option>All</option>
            <option>Veg</option>
            <option>Non-Veg</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-emerald-400/20 text-gray-100 focus:outline-none focus:border-emerald-400"
            aria-label="Sort by"
          >
            <option value="pop-desc">Sort: Popular</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="name-asc">Name: A → Z</option>
            <option value="name-desc">Name: Z → A</option>
          </select>
        </div>

        {/* Price range */}
        <div className="mb-8 rounded-2xl border border-emerald-400/20 bg-white/5 backdrop-blur-xl p-4">
          <div className="flex items-center justify-between text-sm text-gray-300 mb-3">
            <span>Price Range</span>
            <span>{toRupee(minVal)} — {toRupee(maxVal)}</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={minVal}
              onChange={(e) => handleMinChange(e.target.value)}
              className="w-full accent-emerald-400"
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={maxVal}
              onChange={(e) => handleMaxChange(e.target.value)}
              className="w-full accent-emerald-400"
            />
          </div>
        </div>

        {/* Results meta */}
        <div className="text-sm text-gray-400 mb-4">
          Showing <span className="text-emerald-300 font-semibold">{filtered.length}</span> item{filtered.length !== 1 ? "s" : ""}
          {filterCat !== "All" ? ` in ${filterCat}` : ""}{type !== "All" ? ` • ${type}` : ""}{debounced ? ` • “${debounced}”` : ""}
          {" • "}Price {toRupee(minVal)}–{toRupee(maxVal)}
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white/5 backdrop-blur-xl rounded-2xl border border-emerald-400/20 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)]"
                >
                  {/* make the sweep overlay non-interactive so clicks pass through */}
                  <div className="pointer-events-none absolute -inset-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/25 to-lime-300/0 opacity-0 group-hover:opacity-100 blur-md transition" />

                  <img src={item.img} alt={item.name} className="h-48 w-full object-cover" />

                  {/* content sits above overlays */}
                  <div className="relative z-10 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                      <span className="text-emerald-300 font-bold">{toRupee(item.price)}</span>
                    </div>
                    <div className="mt-1 text-xs text-gray-400">
                      {item.category} • {getType(item.tags)}
                      {typeof item.popularity === "number" ? ` • ⭐ ${item.popularity}` : ""}
                    </div>
                    {item.tags?.length ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-white/10 border border-emerald-400/20 text-gray-300">
                            #{t}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {/* Add to Cart */}
                    <div className="mt-4 flex justify-end">
                      <button
                        onClick={() => addToCart(item)}
                        className="px-3 py-2 rounded-lg text-sm font-medium
                                   bg-white/10 hover:bg-emerald-400/20 text-gray-100
                                   border border-emerald-400/20 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-gray-400 py-16">
              No dishes found. Try a different search, type, or price range.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
