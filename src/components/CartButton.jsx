import { ShoppingCart, Send, X } from "lucide-react"
import { useCart } from "../context/CartContext"

export default function CartButton() {
  const { cart, clearCart, removeFromCart } = useCart()

  if (!cart.length) return null

  const handleSend = () => {
    const number = "919731615178" // <-- your WhatsApp (country code, no +)
    const items = cart.map((i, idx) => `${idx + 1}. ${i.name} – ₹${i.price}`).join("\n")
    const msg = encodeURIComponent(
      `🛍️ *Pickup Order Request*\n\n${items}\n\nTotal Items: ${cart.length}\nPlease prepare for pickup.\nSent via Bhojan Mitra website.`
    )
    window.open(`https://wa.me/${number}?text=${msg}`, "_blank")
    clearCart()
  }

  return (
    <div className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-2">
      {/* mini preview */}
      <div className="max-w-xs w-[280px] rounded-2xl bg-gray-900/90 text-white border border-emerald-400/30 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-300" />
            <span className="font-semibold">Cart</span>
          </div>
          <button
            onClick={clearCart}
            className="p-1 rounded-md hover:bg-white/10"
            title="Clear"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-[180px] overflow-auto px-4 py-2 space-y-2">
          {cart.map((i) => (
            <div key={i.name} className="flex items-center justify-between text-sm">
              <span className="truncate">{i.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-emerald-300">₹{i.price}</span>
                <button
                  onClick={() => removeFromCart(i.name)}
                  className="text-gray-400 hover:text-red-300"
                  title="remove"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 pb-3">
          <button
            onClick={handleSend}
            className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-xl
                       bg-gradient-to-r from-emerald-500 to-lime-400 text-gray-900 font-semibold
                       shadow-lg hover:scale-[1.02] transition"
          >
            <Send className="w-4 h-4" /> Send to WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
