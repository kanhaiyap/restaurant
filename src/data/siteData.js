export const site = {
  name: "Bhojan Mitra",
  phone: "+919731615178",
  address: "42 Spice Lane, Foodie Nagar, Mumbai, 400001",
  // Optional: provide precise coordinates [lat, lng] to pin the map exactly.
  // Example: coords: [19.0760, 72.8777]
  // If left undefined, the HoursLocationSection will fall back to using the address string.
  coords: undefined,
  baseImagePath: import.meta.env.BASE_URL || '/',
}

export const theme = {
  // Warm, food-friendly palette (change these to rebrand site-wide)
  brand300: '#FDEBD0', // pale cream
  brand400: '#F59E0B', // warm amber
  brand500: '#D97706', // deep burnt orange
  accent: '#FF7A59',   // warm coral accent
  muted: '#6B7280',    // cool gray for muted text
}

