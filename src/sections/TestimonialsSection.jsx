import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { reviews } from "../data/reviews"
import { useEffect, useState } from "react"

export default function TestimonialsSection() {
  const items = reviews || []
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => setIdx((i) => (i + 1) % items.length), 3500)
    return () => clearInterval(id)
  }, [items.length])

  const prev = () => setIdx((i) => (i - 1 + items.length) % items.length)
  const next = () => setIdx((i) => (i + 1) % items.length)

  return (
    <section className="py-20 bg-white/5 text-gray-900">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <Star className="w-6 h-6 text-amber-400" />
          <h2 className="text-3xl font-bold">What our guests say</h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {items.length ? (
            <div className="rounded-xl p-6 bg-white/6 backdrop-blur-md" style={{ border: '1px solid rgba(34,197,94,0.12)' }}>
              <p className="text-gray-800 text-lg">“{items[idx].text}”</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-gray-900">{items[idx].name}</div>
                  <div className="text-xs text-gray-500">{items[idx].meta}</div>
                </div>
                <div className="flex items-center gap-1" style={{ color: 'var(--brand-300)' }}>
                  {Array.from({ length: items[idx].rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-12">No reviews yet.</div>
          )}

          {items.length > 1 && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-3">
              <button onClick={prev} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`w-2 h-2 rounded-full ${i === idx ? 'bg-amber-500' : 'bg-white/30'}`}
                    aria-label={`Show review ${i + 1}`}
                  />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
