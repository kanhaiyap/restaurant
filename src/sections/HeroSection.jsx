import { motion } from "framer-motion"
const base = import.meta.env.BASE_URL;

export default function HeroSection() {
  return (
    <section
      className="relative h-[90vh] flex flex-col justify-center items-center text-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url('${base}hero.jpeg')` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-brand-dark/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

      <motion.div
        className="relative z-10 text-white space-y-6 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold drop-shadow-[0_0_15px_rgba(22,163,74,0.7)]"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-lime-300 to-brand">
            Mahadev Restaurant
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

        <motion.button
          whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(22,163,74,0.8)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-8 py-4 bg-gradient-to-r from-brand to-emerald-400 text-lg font-semibold rounded-2xl text-white shadow-lg hover:shadow-brand-dark transition"
        >
          Explore Menu →
        </motion.button>
      </motion.div>
    </section>
  )
}
