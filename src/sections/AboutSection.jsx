import { motion } from "framer-motion"
const base = import.meta.env.BASE_URL;
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
            className="absolute w-3 h-3 rounded-full blur-md"
            style={{ background: 'rgba(34,197,94,0.5)' }}
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
          <div className="absolute -inset-1 rounded-2xl blur-lg opacity-40" style={{ background: 'linear-gradient(90deg,var(--brand-300),var(--brand-400),var(--brand-500))' }} />
          <img
            src={`${base}about-chef.jpg`}
            alt="Chef"
            className="relative rounded-2xl shadow-xl"
            style={{ border: '1px solid rgba(34,197,94,0.18)' }}
          />
        </motion.div>

        {/* floating glass text card */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl shadow-2xl"
          style={{ border: '1px solid rgba(74,222,128,0.12)' }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg,var(--brand-300),var(--brand-500))', WebkitBackgroundClip: 'text' }}>
            About Us
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            <span className="font-semibold" style={{ color: 'var(--brand-400)' }}>Bhojan Mitra </span>
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
