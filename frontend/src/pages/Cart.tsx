import { Trash2, Plus, Minus } from "lucide-react"; 
import { Link } from "react-router-dom";
import { useCart } from "../components/Context";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="max-w-7xl mx-auto px-3 md:px-20 py-10 font-sans">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* --- PRODUCT SECTION --- */}
        <div className="flex-2">
          {/* DESKTOP TABLE: Visible only on md screens and up */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#F9F1E7] h-14">
                <tr>
                  <th className="pl-4 font-medium">Product</th>
                  <th className="font-medium">Price</th>
                  <th className="font-medium text-center">Quantity</th>
                  <th className="font-medium">Subtotal</th>
                  <th className="pr-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b border-gray-100 h-24">
                    <td className="flex items-center gap-4 py-4 pl-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-[#F9F1E7]" />
                      <span className="text-gray-400">{item.name}</span>
                    </td>
                    <td className="text-gray-400">Rs. {item.price.toLocaleString()}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => updateQuantity(item._id, -1)} className="p-1 border rounded hover:bg-gray-100"><Minus size={14}/></button>
                        <span className="w-8">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="p-1 border rounded hover:bg-gray-100"><Plus size={14}/></button>
                      </div>
                    </td>
                    <td className="text-black font-medium">Rs. {(item.price * item.quantity).toLocaleString()}</td>
                    <td className="pr-4">
                      <button onClick={() => removeFromCart(item._id)} className="text-[#B88E2F] hover:text-red-500">
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS: Visible only on screens below 768px (like your 350px target) */}
          <div className="md:hidden space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white border border-gray-100 rounded-xl p-4 flex gap-4 relative shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-[#F9F1E7]" />
                
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-800 leading-tight">{item.name}</h3>
                    <p className="text-[#B88E2F] text-xs font-semibold mt-1">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
                      <button onClick={() => updateQuantity(item._id, -1)} className="text-gray-500"><Minus size={12}/></button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, 1)} className="text-gray-500"><Plus size={12}/></button>
                    </div>
                    <span className="text-sm font-bold">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)} 
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {cartItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-6">Your cart is empty.</p>
              <Link to="/shop" className="bg-[#B88E2F] text-white px-8 py-3 rounded-md text-sm">Return To Shop</Link>
            </div>
          )}
        </div>

        {/* --- CART TOTALS --- */}
        <div className="flex-1 bg-[#F9F1E7] p-6 md:p-8 rounded-xl h-fit">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Cart Totals</h2>
          <div className="flex justify-between mb-8 border-b border-gray-200 pb-4">
            <span className="font-bold">Total</span>
            <span className="text-[#B88E2F] text-xl font-bold">Rs. {subtotal.toLocaleString()}</span>
          </div>
          <Link 
            to="/checkout" 
            className={`block w-full text-center bg-transparent border border-black py-4 font-bold rounded-xl transition-all ${
              cartItems.length === 0 
                ? "opacity-50 pointer-events-none" 
                : "hover:bg-black hover:text-white"
            }`}
          >
            Check Out
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;