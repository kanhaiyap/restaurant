import { site } from "../data/siteData"

export default function HoursLocationSection() {
  // Prefer precise coordinates when available (site.coords = [lat, lng])
  const hasCoords = Array.isArray(site.coords) && site.coords.length === 2;
  const [lat, lng] = hasCoords ? site.coords : [null, null];

  // Embed / link URLs -- use coords if available, otherwise search by address
  const mapsEmbedSrc = hasCoords
    ? `https://www.google.com/maps?q=${lat},${lng}&z=17&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;

  const mapsLink = hasCoords
    ? `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return (
    <section className="py-20 bg-gradient-to-b text-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-4">Hours & Location</h2>
            <p className="text-gray-700 mb-2">Visit us at:</p>
            <address className="not-italic text-gray-800 font-medium text-lg leading-snug">
              {site.address}
            </address>

            <div className="mt-6">
              <h3 className="font-semibold">Opening hours</h3>
              <ul className="mt-2 text-gray-700">
                <li>Mon–Fri: 11:30 AM — 11:00 PM</li>
                <li>Sat–Sun: 9:00 AM — 12:00 AM (Brunch on weekends)</li>
              </ul>
            </div>

            <div className="mt-6 flex items-center gap-3">
              <a
                className="inline-block px-4 py-2 rounded-md text-white font-medium"
                href={`tel:${site.phone}`}
                style={{ background: 'linear-gradient(90deg,var(--accent),var(--brand-500))' }}
              >
                Call us
              </a>

              <a
                className="inline-block px-4 py-2 rounded-md bg-transparent border border-gray-300 text-gray-800 font-medium"
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
            </div>
          </div>

          <div>
            {/* Responsive map embed using Google Maps search (no API key required). */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-md" style={{ paddingBottom: '56.25%' }}>
              <iframe
                title="Map showing restaurant location"
                src={mapsEmbedSrc}
                className="absolute inset-0 w-full h-full border-0"
                aria-label={`Map showing location for ${site.name}`}
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-xs text-gray-600">Map provided by Google Maps. Open in a new tab for full directions.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
