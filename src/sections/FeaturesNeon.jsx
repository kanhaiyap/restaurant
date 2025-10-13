// src/sections/FeaturesNeon.jsx
import { motion } from "framer-motion"
import { Mic, Cpu, Sparkles, Receipt } from "lucide-react"

const items = [
  { icon: Mic, title: "Voice Ordering", desc: "Hands-free, multilingual orders with real-time confirmations." },
  { icon: Cpu, title: "AI Recommendations", desc: "Smart upsells based on time, weather, and diner history." },
  { icon: Receipt, title: "Instant Billing", desc: "Tap-to-pay, split bills, and GST invoices in a tap." },
  { icon: Sparkles, title: "Smart Ambience", desc: "Auto lights & music synced to guest mood." },
]

export default function FeaturesNeon() {
  return (
    <section className="relative py-20 bg-gray-950">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[conic-gradient(at_50%_50%,rgba(16,185,129,.08),transparent_40%)]" />
      <div className="relative container mx-auto px-6">
        <h3 className="text-center text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300 mb-12">
          The Future of Dining, Today
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, title, desc }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20, rotateX: -6 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -6, rotateX: 2 }}
              className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl border border-emerald-400/20 shadow-[0_0_40px_rgba(16,185,129,0.15)]"
            >
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-emerald-400/0 via-emerald-400/20 to-lime-300/0 opacity-0 group-hover:opacity-100 blur-md transition" />
              <Icon className="w-8 h-8 text-emerald-300 mb-4" />
              <h4 className="text-xl font-semibold text-white">{title}</h4>
              <p className="text-gray-300 mt-2 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
