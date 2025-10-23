// Specials (keeps existing structure)
export const specials = [
  {
    id: 'ai-combo',
    name: "AI Chef’s Combo",
    desc: "Paneer Tikka + Butter Naan + Cold Coffee",
    img: 'https://images.unsplash.com/photo-1604908177522-1c3f7d7a8e6a?auto=format&fit=crop&w=1200&q=80',
    price: 349, oldPrice: 449, tag: "Today Only", endsInMins: 180, popularity: 98,
  },
  {
    id: 'voice-thali',
    name: "Voice-Order Thali",
    desc: "Mini Thali with smart pairing recommendations",
  img: 'https://images.unsplash.com/photo-1604908177521-4a4f3c2b3bb2?auto=format&fit=crop&w=1200&q=80',
    price: 279, oldPrice: 349, tag: "Limited", endsInMins: 300, popularity: 91,
  },
  {
    id: 'neon-dessert',
    name: "Neon Nights Dessert",
    desc: "Chocolate Lava Cake + Ice Cream",
  img: 'https://images.unsplash.com/photo-1608747706638-0b5a1f6f4c3b?auto=format&fit=crop&w=1200&q=80',
    price: 179, oldPrice: 229, tag: "After 7 PM", endsInMins: 600, popularity: 87,
  },
]

// Main menu dishes — use Unsplash source URLs keyed by food name to ensure images load
export const dishes = [
  { name: "Paneer Tikka", price: 220, category: "Starters", img: 'https://images.unsplash.com/photo-1604908177522-1c3f7d7a8e6a?auto=format&fit=crop&w=1200&q=80', tags: ["veg", "spicy"], popularity: 92 },
  { name: "Masala Dosa", price: 180, category: "South Indian", img: 'https://images.unsplash.com/photo-1606756791131-2d2d5b6d5c1f?auto=format&fit=crop&w=1200&q=80', tags: ["veg"], popularity: 88 },
  { name: "Veg Biryani", price: 250, category: "Main Course", img: 'https://images.unsplash.com/photo-1604908177521-4a4f3c2b3bb2?auto=format&fit=crop&w=1200&q=80', tags: ["veg"], popularity: 81 },
  { name: "Butter Chicken", price: 320, category: "Main Course", img: 'https://images.unsplash.com/photo-1604908177523-8bb4f3e6c1a9?auto=format&fit=crop&w=1200&q=80', tags: ["non-veg"], popularity: 95 },
  { name: "Cold Coffee", price: 120, category: "Beverages", img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=80', tags: ["veg"], popularity: 76 },
  { name: "Chocolate Lava Cake", price: 160, category: "Desserts", img: 'https://images.unsplash.com/photo-1608747706638-0b5a1f6f4c3b?auto=format&fit=crop&w=1200&q=80', tags: ["veg", "sweet"], popularity: 85 },
]

export default {
  specials,
  dishes,
}
