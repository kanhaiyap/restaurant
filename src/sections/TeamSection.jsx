import { chefs } from "../data/team"

export default function TeamSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Meet our chefs</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(chefs || []).map((c) => (
            <div key={c.id || c.name} className="rounded-2xl p-5 bg-white/6 border border-white/6">
              <div className="h-44 w-full bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center text-gray-400">
                {c.img ? <img src={c.img} alt={c.name} className="h-full w-full object-cover" /> : <span>{c.name}</span>}
              </div>
              <div className="mt-4">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-300">{c.role}</div>
                <p className="mt-2 text-gray-400 text-sm">{c.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
