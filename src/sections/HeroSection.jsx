import { motion } from "framer-motion"
import { site } from "../data/siteData"
const base = import.meta.env.BASE_URL;

export default function HeroSection() {
  return (
    <section
      className="relative h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden bg-cover bg-center ken-burns"
      style={{ backgroundImage: `url('${base}hero.jpeg')` }}
    >
  <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.6), rgba(var(--brand-500-rgb),0.25))' }} />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)]" />

      <motion.div
        className="relative z-10 text-on-dark space-y-6 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
          <motion.h1
          className="text-5xl md:text-7xl font-extrabold"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, var(--brand-400), var(--accent), var(--brand-500))' }}>
            {site.name}
          </span>{" "}
          Restaurant
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-200 tracking-wide max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          AI-Powered Dining • Voice Ordering • Next-Gen Experience
        </motion.p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.04 }}
            className="inline-block px-6 py-3 rounded-2xl text-lg font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, var(--brand-500), var(--brand-400))', boxShadow: '0 10px 30px rgba(34,197,94,0.08)' }}
          >
            Explore Menu →
          </motion.a>

          <motion.a
            href="#reserve"
            whileHover={{ scale: 1.04 }}
            className="inline-block px-6 py-3 rounded-2xl text-lg font-semibold text-white"
            style={{ background: 'linear-gradient(90deg, var(--accent), rgba(0,0,0,0.2))', boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }}
          >
            Reserve a Table
          </motion.a>
        </div>
      </motion.div>
    </section>
  )
}
