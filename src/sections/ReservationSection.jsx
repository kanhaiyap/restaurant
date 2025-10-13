import { useState } from "react"

export default function ReservationSection() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    datetime: "",
  })

  // change to your restaurant’s WhatsApp number (with country code, no +)
  const restaurantNumber = "919876543210" // example: +91 9876543210 → "919876543210"

  const restaurantName = "Bhojan Mitra Restaurant"
  const restaurantLocation = "Bhilai, Chhattisgarh"

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
      <div className="absolute inset-0 bg-[radial-gradient(700px_circle_at_30%_30%,rgba(16,185,129,0.15),transparent_60%),radial-gradient(600px_circle_at_80%_70%,rgba(132,204,22,0.1),transparent_60%)]" />

      <div className="relative container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-lime-300 drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]">
          Reserve Your Table Instantly
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto grid gap-4 bg-white/5 backdrop-blur-xl border border-emerald-400/20 p-8 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.2)]"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-emerald-400/20 bg-transparent p-3 rounded-xl focus:outline-none focus:border-emerald-400 placeholder-gray-400 text-gray-100"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="border border-emerald-400/20 bg-transparent p-3 rounded-xl focus:outline-none focus:border-emerald-400 placeholder-gray-400 text-gray-100"
          />
          <input
            type="datetime-local"
            name="datetime"
            value={form.datetime}
            onChange={handleChange}
            required
            className="border border-emerald-400/20 bg-transparent p-3 rounded-xl focus:outline-none focus:border-emerald-400 text-gray-300"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-brand to-emerald-400 py-3 rounded-xl text-lg font-semibold hover:scale-105 transition-transform shadow-lg shadow-emerald-400/30"
          >
            Book Now on WhatsApp →
          </button>
        </form>

        <p className="mt-6 text-gray-400 text-sm">
          💬 Our team at <span className="text-emerald-300 font-medium">{restaurantName}</span> in{" "}
          <span className="text-emerald-300 font-medium">{restaurantLocation}</span> will confirm your booking via WhatsApp.
        </p>
      </div>
    </section>
  )
}
