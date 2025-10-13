// src/sections/StatsSection.jsx
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

function useCounter(target = 100, duration = 1200, startWhen = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!startWhen) return
    let start = 0
    const t0 = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      const next = Math.floor(eased * target)
      if (next !== start) {
        start = next
        setValue(next)
      }
      if (p < 1) requestAnimationFrame(step)
    }
    const r = requestAnimationFrame(step)
    return () => cancelAnimationFrame(r)
  }, [target, duration, startWhen])
  return value
}

const Stat = ({ label, to }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  const val = useCounter(to, 1200, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-emerald-400/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
    >
      <div className="text-5xl md:text-6xl font-extrabold tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">
          {val.toLocaleString()}
        </span>
        <span className="text-emerald-300">+</span>
      </div>
      <div className="mt-2 text-gray-300">{label}</div>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-hidden">
      <div className="absolute -inset-24 bg-[radial-gradient(600px_circle_at_20%_20%,rgba(16,185,129,.15),transparent_60%),radial-gradient(500px_circle_at_80%_50%,rgba(163,230,53,.12),transparent_60%)]" />
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-10">
          <h3 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300">
            Powered by Intelligence • Loved by Diners
          </h3>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          <Stat label="Happy Customers" to={12500} />
          <Stat label="Smart Tables Live" to={320} />
          <Stat label="Orders via Voice" to={88000} />
          <Stat label="Partner Restaurants" to={46} />
        </div>
      </div>
    </section>
  )
}
