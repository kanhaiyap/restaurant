
// src/sections/TechMarquee.jsx
export default function TechMarquee() {
    const items = ["AI • IoT", "Voice Tech", "Edge Inference", "GST Billing", "NFC Pay", "Smart Kitchen", "Realtime CRM"]
    return (
      <div className="bg-gray-900 border-y border-emerald-500/20">
        <div className="overflow-hidden">
          <div
            className="flex gap-8 py-4 whitespace-nowrap"
            style={{ animation: "marquee 18s linear infinite" }}
          >
            {[...items, ...items].map((t, i) => (
              <span key={i} className="text-emerald-300/90">{t}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }
  