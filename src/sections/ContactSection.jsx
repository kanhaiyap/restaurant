import { motion } from "framer-motion"
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react"

export default function ContactSection() {
  const contact = {
    phone: "9731615178",
    email: "contact@bhojanmitra.in",
    location: "Bhilai, Chhattisgarh, India",
    whatsapp: "919731615178", // use full number with country code
  }

  return (
    <section
      id="contact"
      className="relative py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
      {/* glowing background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(700px circle at 20% 20%, rgba(34,197,94,0.12), transparent 60%), radial-gradient(700px circle at 80% 70%, rgba(132,204,22,0.08), transparent 60%)'
        }}
      />

      <div className="relative container mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-10 bg-clip-text text-transparent bg-gradient-to-r drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]"
          style={{
            backgroundImage: 'linear-gradient(90deg, var(--brand-400), var(--accent))'
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Get in Touch
        </motion.h2>

        <motion.p
          className="text-gray-300 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Have a question, partnership idea, or feedback?  
          We’d love to connect — our team at <span style={{ color: 'var(--brand-300)', fontWeight: 600 }}>Bhojan Mitra</span> is always listening.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {/* Phone */}
          <motion.a
            href={`tel:${contact.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.03 }}
            className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl transition"
            style={{
              border: '1px solid rgba(74,222,128,0.12)',
              boxShadow: '0 0 40px rgba(34,197,94,0.12)'
            }}
          >
            <div
              className="absolute -inset-px opacity-0 group-hover:opacity-100 blur-md transition"
              style={{
                background: 'linear-gradient(90deg, rgba(74,222,128,0) 0%, rgba(74,222,128,0.18) 50%, rgba(255,122,89,0) 100%)'
              }}
            />
            <Phone className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--brand-300)' }} />
            <h4 className="font-semibold text-lg mb-1">Call Us</h4>
            <p className="text-gray-300">{contact.phone}</p>
          </motion.a>

          {/* Email */}
          <motion.a
            href={`mailto:${contact.email}`}
            whileHover={{ y: -5, scale: 1.03 }}
            className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl transition"
            style={{
              border: '1px solid rgba(74,222,128,0.12)',
              boxShadow: '0 0 40px rgba(34,197,94,0.12)'
            }}
          >
            <div
              className="absolute -inset-px opacity-0 group-hover:opacity-100 blur-md transition"
              style={{
                background: 'linear-gradient(90deg, rgba(74,222,128,0) 0%, rgba(74,222,128,0.18) 50%, rgba(255,122,89,0) 100%)'
              }}
            />
            <Mail className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--brand-300)' }} />
            <h4 className="font-semibold text-lg mb-1">Email Us</h4>
            <p className="text-gray-300 break-words">{contact.email}</p>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
              "Hello Bhojan Mitra! I’d like to know more about your restaurant services."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.03 }}
            className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl transition"
            style={{
              border: '1px solid rgba(74,222,128,0.12)',
              boxShadow: '0 0 40px rgba(34,197,94,0.12)'
            }}
          >
            <div
              className="absolute -inset-px opacity-0 group-hover:opacity-100 blur-md transition"
              style={{
                background: 'linear-gradient(90deg, rgba(74,222,128,0) 0%, rgba(74,222,128,0.18) 50%, rgba(255,122,89,0) 100%)'
              }}
            />
            <MessageCircle className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--brand-300)' }} />
            <h4 className="font-semibold text-lg mb-1">Chat on WhatsApp</h4>
            <p className="text-gray-300">Instant replies, 10 AM – 10 PM</p>
          </motion.a>

          {/* Location */}
          <motion.a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              contact.location
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5, scale: 1.03 }}
            className="group relative rounded-2xl p-6 bg-white/5 backdrop-blur-xl transition"
            style={{
              border: '1px solid rgba(74,222,128,0.12)',
              boxShadow: '0 0 40px rgba(34,197,94,0.12)'
            }}
          >
            <div
              className="absolute -inset-px opacity-0 group-hover:opacity-100 blur-md transition"
              style={{
                background: 'linear-gradient(90deg, rgba(74,222,128,0) 0%, rgba(74,222,128,0.18) 50%, rgba(255,122,89,0) 100%)'
              }}
            />
            <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: 'var(--brand-300)' }} />
            <h4 className="font-semibold text-lg mb-1">Visit Us</h4>
            <p className="text-gray-300">{contact.location}</p>
          </motion.a>
        </div>

        <motion.p
          className="mt-12 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          Designed & powered by <span style={{ color: 'var(--brand-400)', fontWeight: 500 }}>Aarohita Vigyan Private Limited</span> • Smart Dining Technology 2025 ©
        </motion.p>
      </div>
    </section>
  )
}
