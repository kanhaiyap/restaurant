import { useEffect, useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flame, Timer, Sparkles } from "lucide-react"
import { useCart } from "../context/CartContext"
import { specials as dataSpecials } from "../data/menu"
import { site } from "../data/siteData"

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
    return (dataSpecials || []).map((s) => ({ ...s, endAt: now + (s.endsInMins ?? 60) * 60_000 }))
  }, [])

  const [, setTick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const orderWhatsApp = (item) => {
  const number = site.phone.replace(/[^0-9+]/g, "") || "919731615178" // use site phone from data
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
          <Flame className="w-8 h-8" style={{ color: 'var(--brand-300)' }} />
          <h2 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, var(--brand-400), var(--accent))' }}>
            Today’s Specials
          </h2>
          <Sparkles className="w-8 h-8" style={{ color: 'var(--brand-300)' }} />
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
                    className={`group relative overflow-hidden rounded-2xl border backdrop-blur-xl shadow-[0_0_40px_rgba(34,197,94,0.12)]
                      ${expired ? "opacity-60" : "bg-white/5"}`}
                    style={{ borderColor: 'rgba(34,197,94,0.2)' }}
                  >
                    {/* hover neon sweep */}
        <div className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 blur-md transition"
          style={{ background: 'linear-gradient(90deg, rgba(74,222,128,0) 0%, rgba(74,222,128,0.18) 50%, rgba(255,122,89,0) 100%)' }} />

                    {/* tag */}
                    <div className="absolute left-0 top-0 z-10">
                      <span
                        className="m-3 inline-block rounded-full px-3 py-1 text-xs"
                        style={{
                          /* stronger, theme-driven tint for better contrast on light backgrounds */
                          background: 'rgba(var(--brand-300-rgb),0.12)',
                          border: '1px solid rgba(var(--brand-300-rgb),0.18)',
                          color: 'var(--site-text-color)',
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <img src={item.img} alt={item.name} className="h-48 w-full object-cover" />

                    {/* content on top */}
                    <div className="relative z-10 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                        <div className="text-right">
                  <div className="font-bold" style={{ color: 'var(--brand-400)' }}>₹{item.price}</div>
                          {item.oldPrice && (
                            <div className="text-xs text-gray-400 line-through">₹{item.oldPrice}</div>
                          )}
                        </div>
                      </div>

                      <p className="mt-2 text-gray-300 text-sm">{item.desc}</p>

                      <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--brand-300)' }}>
                          <Timer className="w-4 h-4" />
                          <span>{expired ? "Expired" : `Ends in ${formatLeft(left)}`}</span>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => addToCart(item)}
                            disabled={expired}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                              expired ? "bg-gray-700/60 text-gray-400 cursor-not-allowed" : "text-on-dark"
                            }`}
                            style={!expired ? { background: 'linear-gradient(90deg,var(--brand-300),var(--brand-500))', borderColor: 'rgba(var(--brand-300-rgb),0.14)', boxShadow: '0 6px 18px rgba(var(--brand-300-rgb),0.06)' } : undefined}
                          >
                            Add to Cart
                          </button>
                          <button
                            onClick={() => orderWhatsApp(item)}
                            disabled={expired}
                            className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                              expired ? "bg-gray-700/60 text-gray-400 cursor-not-allowed" : "text-on-dark shadow-lg hover:scale-105"
                            }`}
                            style={!expired ? { background: 'linear-gradient(90deg,var(--accent),var(--brand-500))', boxShadow: '0 10px 28px rgba(var(--accent-rgb),0.08)' } : undefined}
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
