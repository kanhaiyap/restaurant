import { motion } from "framer-motion"
import aboutImg from "/about-chef.jpg" // adjust if stored elsewhere

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* moving light orbs background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-3 h-3 bg-emerald-400/50 rounded-full blur-md"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0.3,
            }}
            animate={{
              y: [null, Math.random() * -200],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: Math.random() * 8 + 5,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* image with animated border glow */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-lime-300 to-brand rounded-2xl blur-lg opacity-40" />
          <img
            src={aboutImg}
            alt="Chef"
            className="relative rounded-2xl shadow-xl border border-emerald-500/20"
          />
        </motion.div>

        {/* floating glass text card */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-2xl border border-emerald-400/20"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-lime-300 drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">
            About Us
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            <span className="text-emerald-400 font-semibold">Bhojan Mitra </span>
            merges culinary art with intelligence — redefining Indian dining through voice-enabled ordering,
            predictive service, and smart ambience control.  
            Every table becomes interactive, every dish a data-driven delight.
          </p>
          <p className="mt-4 text-gray-400">
            Tradition meets tomorrow — taste powered by technology.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
