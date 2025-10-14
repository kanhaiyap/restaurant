import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Timer, Sparkles } from "lucide-react"
import { useCart } from "../context/CartContext"
const base = import.meta.env.BASE_URL
const specials = [
  {
    name: "AI Chef’s Combo",
    desc: "Paneer Tikka + Butter Naan + Cold Coffee",
    img: `${base}images/AI-ChefCombo.jpg`,
    price: 349, oldPrice: 449, tag: "Today Only", endsInMins: 180, popularity: 98,
  },
  {
    name: "Voice-Order Thali",
    desc: "Mini Thali with smart pairing recommendations",
    img: "/images/specials/voice-thali.jpg",
    price: 279, oldPrice: 349, tag: "Limited", endsInMins: 300, popularity: 91,
  },
  {
    name: "Neon Nights Dessert",
    desc: "Chocolate Lava Cake + Ice Cream",
    img: "/images/specials/neon-dessert.jpg",
    price: 179, oldPrice: 229, tag: "After 7 PM", endsInMins: 600, popularity: 87,
  },
]

const toRupee = (n) => `₹${n.toLocaleString("en-IN")}`
const formatLeft = (ms) => {
  const t = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(t / 3600)
  const m = Math.floor((t % 3600) / 60)
  const s = t % 60
  return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`
}

export default function SpecialsSection() {
  const { addToCart } = useCart()

  const withEnds = useMemo(() => {
    const now = Date.now()
    return specials.map((s) => ({ ...s, endAt: now + (s.endsInMins ?? 60) * 60_000 }))
  }, [])

  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const orderWhatsApp = (item) => {
    const number = "919731615178" // <-- your WhatsApp number
    const msg = encodeURIComponent(
      `🔥 *Special Order*\n\n` +
      `Item: ${item.name}\n` +
      `Price: ${toRupee(item.price)}${item.oldPrice ? ` (was ${toRupee(item.oldPrice)})` : ""}\n\n` +
      `Sent from Bhojan Mitra website.`
    )
    window.open(`https://wa.me/${number}?text=${msg}`, "_blank")
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
      {/* subtle glow bg */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_25%_20%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(700px_circle_at_80%_60%,rgba(132,204,22,0.12),transparent_60%)]" />

      <div className="relative container mx-auto px-6">
        <motion.div
          className="flex items-center justify-center gap-3 mb-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Flame className="w-8 h-8 text-emerald-300" />
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-300">
            Today’s Specials
          </h2>
          <Sparkles className="w-8 h-8 text-emerald-300" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {withEnds
              .sort((a, b) => b.popularity - a.popularity)
              .map((item) => {
                const left = item.endAt - Date.now()
                const expired = left <= 0
                return (
                  <motion.div
                    key={item.name}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className={`group relative overflow-hidden rounded-2xl border border-emerald-400/20 backdrop-blur-xl shadow-[0_0_40px_rgba(16,185,129,0.15)]
                      ${expired ? "opacity-60" : "bg-white/5"}`}
                  >
                    {/* hover neon sweep */}
                    <div className="pointer-events-none absolute -inset-px bg-gradient-to-r from-emerald-400/0 via-emerald-400/25 to-lime-300/0 opacity-0 group-hover:opacity-100 blur-md transition" />

                    {/* tag */}
                    <div className="absolute left-0 top-0 z-10">
                      <span className="m-3 inline-block rounded-full bg-emerald-500/20 border border-emerald-400/40 px-3 py-1 text-xs text-emerald-200">
                        {item.tag}
                      </span>
                    </div>

                    <img src={item.img} alt={item.name} className="h-48 w-full object-cover" />

                    {/* content on top */}
                    <div className="relative z-10 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <div className="text-right">
                          <div className="text-emerald-300 font-bold">₹{item.price}</div>
                          {item.oldPrice && (
                            <div className="text-xs text-gray-400 line-through">₹{item.oldPrice}</div>
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-gray-300 text-sm">{item.desc}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-emerald-300 text-sm">
                          <Timer className="w-4 h-4" />
                          <span>{expired ? "Expired" : `Ends in ${formatLeft(left)}`}</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(item)}
                            disabled={expired}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition
                              ${expired ? "bg-gray-700/60 text-gray-400 cursor-not-allowed"
                                        : "bg-white/10 hover:bg-emerald-400/20 text-gray-100 border border-emerald-400/20"}`}
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => orderWhatsApp(item)}
                            disabled={expired}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition
                              ${expired ? "bg-gray-700/60 text-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-brand to-emerald-400 text-white shadow-lg shadow-emerald-400/30 hover:scale-105"}`}
                          >
                            WhatsApp
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
