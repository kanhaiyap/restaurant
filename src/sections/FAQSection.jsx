import { useState } from "react"

const faqs = [
  { q: "Do you take reservations?", a: "Yes — reserve a table via our Reservation section or call us directly." },
  { q: "Do you offer vegan options?", a: "We have dedicated vegan and gluten-free options on the menu." },
  { q: "Is parking available?", a: "Limited street parking is available; we recommend booking early for dinner." },
]

export default function FAQSection() {
  const [open, setOpen] = useState(null)
  return (
    <section className="py-20 bg-white/3 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Frequently asked questions</h2>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="bg-white/6 p-4 rounded-lg border border-white/6">
              <button
                className="w-full text-left flex items-center justify-between"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span className="font-medium">{f.q}</span>
                <span className="text-sm text-gray-300">{open === i ? "—" : "+"}</span>
              </button>
              {open === i && (
                <div className="mt-2 text-gray-300 text-sm">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
