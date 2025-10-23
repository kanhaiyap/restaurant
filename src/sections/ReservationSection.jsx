import { useState } from "react"
import { site } from "../data/siteData"

export default function ReservationSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    datetime: "",
  })

  // use phone and site data
  const restaurantNumber = site.phone.replace(/[^0-9+]/g, "") || "919876543210"
  const restaurantName = site.name
  const restaurantLocation = site.address

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, phone, datetime } = form

    // 🧠 Build message for WhatsApp
    const msg = encodeURIComponent(
      `🍽️ *Table Reservation Request*\n\n` +
        `👤 Name: ${name}\n📞 Phone: ${phone}\n🕒 Date & Time: ${datetime}\n\n` +
        `🏢 *Restaurant:* ${restaurantName}\n📍 *Location:* ${restaurantLocation}\n\n` +
        `Sent via Bhojan Mitra website 🌿🤖`
    )

    const url = `https://wa.me/${restaurantNumber}?text=${msg}`
    window.open(url, "_blank")
  }

  return (
    <section
      id="reserve"
      className="relative py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden"
    >
  {/* background effect */}
  <div className="absolute inset-0" style={{ background: 'radial-gradient(700px at 30% 30%, rgba(34,197,94,0.12), transparent 60%), radial-gradient(600px at 80% 70%, rgba(255,122,89,0.06), transparent 60%)' }} />

      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg,var(--brand300),var(--brand500))', WebkitBackgroundClip: 'text' }}>
          Reserve Your Table Instantly
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto grid gap-4 bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-lg"
          style={{ border: '1px solid rgba(34,197,94,0.12)', boxShadow: '0 0 40px rgba(34,197,94,0.08)' }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border bg-transparent p-3 rounded-xl focus:outline-none placeholder-gray-400 text-gray-100"
            style={{ borderColor: 'rgba(34,197,94,0.12)' }}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border bg-transparent p-3 rounded-xl focus:outline-none placeholder-gray-400 text-gray-100"
            style={{ borderColor: 'rgba(34,197,94,0.12)' }}
          />
          <input
            type="datetime-local"
            name="datetime"
            value={form.datetime}
            onChange={handleChange}
            required
            className="border bg-transparent p-3 rounded-xl focus:outline-none text-gray-300"
            style={{ borderColor: 'rgba(34,197,94,0.12)' }}
          />

          <button
            type="submit"
            className="py-3 rounded-xl text-lg font-semibold hover:scale-105 transition-transform text-white"
            style={{ background: 'linear-gradient(90deg,var(--accent),var(--brand500))', boxShadow: '0 10px 30px rgba(34,197,94,0.08)' }}
          >
            Book Now on WhatsApp →
          </button>
        </form>

        <p className="mt-6 text-gray-400 text-sm">
          💬 Our team at <span style={{ color: 'var(--brand-300)', fontWeight: 500 }}>{restaurantName}</span> in{" "}
          <span style={{ color: 'var(--brand-300)', fontWeight: 500 }}>{restaurantLocation}</span> will confirm your booking via WhatsApp.
        </p>
      </div>
    </section>
  )
}
