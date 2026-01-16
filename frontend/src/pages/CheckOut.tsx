import { useState } from "react"; // 1. Import useState
import { Link, useNavigate } from "react-router-dom"; // 2. Import useNavigate
import { useCart } from "../components/Context";
import { CheckCircle } from "lucide-react"; // 3. For the success icon

const CheckOut = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // 4. State for popup

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 5. Function to handle order placement
  const handlePlaceOrder = () => {
    // In a real app, you would send your data to an API here
    setShowModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-20 py-10 not-italic relative">
      {/* Banner and Heading */}
      <div className="bg-[url('images/shop-hero.png')] bg-cover bg-center flex items-center justify-center flex-col h-80 py-12 mb-10 text-center rounded-sm">
        <img src="/icons/logo.png" alt="Logo" className="mb-2" />
        <h1 className="text-4xl font-bold text-gray-800 not-italic">Checkout</h1>
        <p className="mt-2 not-italic">
          <Link to="/" className="hover:text-[#B88E2F] text-lg font-semibold">Home</Link> &gt;{" "}
          <span>
            <Link to="/checkout" className="text-gray-800">Checkout</Link>
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Billing Details Form */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Billing details</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">First Name</label>
                <input type="text" className="border border-gray-400 rounded-md p-3 focus:outline-[#B88E2F]" placeholder="John" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Last Name</label>
                <input type="text" className="border border-gray-400 rounded-md p-3 focus:outline-[#B88E2F]" placeholder="Doe" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold">Country / Region</label>
              <select className="border border-gray-400 rounded-md p-3 focus:outline-[#B88E2F] bg-white">
                <option>India</option>
                <option>Sri Lanka</option>
                <option>USA</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold">Street address</label>
              <input type="text" className="border border-gray-400 rounded-md p-3 focus:outline-[#B88E2F]" placeholder="123 Main St" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold">Town / City</label>
              <input type="text" className="border border-gray-400 rounded-md p-3 focus:outline-[#B88E2F]" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-semibold">Email address</label>
              <input type="email" className="border border-gray-400 rounded-md p-3 focus:outline-[#B88E2F]" placeholder="john@example.com" />
            </div>

            <div className="flex flex-col gap-2">
              <textarea 
                placeholder="Additional information" 
                className="border border-gray-400 rounded-md p-3 focus:outline-[#B88E2F] h-32"
              ></textarea>
            </div>
          </form>
        </section>

        {/* Right Side: Order Summary & Payment */}
        <section className="p-2 lg:px-10">
          <div className="mb-8">
            <div className="flex justify-between text-2xl font-bold mb-6">
              <span>Product</span>
              <span>Subtotal</span>
            </div>

            <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-center text-gray-500">
                  <span className="text-sm">
                    {item.name} <span className="text-black font-medium ml-2">x {item.quantity}</span>
                  </span>
                  <span className="text-black font-medium">
                    Rs. {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              {cartItems.length === 0 && (
                <p className="text-gray-400 italic">Your cart is empty.</p>
              )}
            </div>

            <div className="flex justify-between mb-4 border-t pt-4">
              <span className="font-semibold">Subtotal</span>
              <span className="text-gray-600">Rs. {subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between mb-8">
              <span className="font-semibold text-lg">Total</span>
              <span className="text-2xl font-bold text-[#B88E2F]">
                Rs. {subtotal.toLocaleString()}
              </span>
            </div>
          </div>

          <hr className="mb-8 border-gray-200" />

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input type="radio" name="payment" id="bank" defaultChecked className="accent-black w-4 h-4" />
              <label htmlFor="bank" className="font-bold cursor-pointer">Direct Bank Transfer</label>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed text-justify">
              Make your payment directly into our bank account. Please use your Order ID as the payment reference.
            </p>
            
            <div className="flex items-center gap-3 text-gray-400">
              <input type="radio" name="payment" id="cod" className="accent-black w-4 h-4" />
              <label htmlFor="cod" className="cursor-pointer">Cash On Delivery</label>
            </div>
          </div>

          <p className="my-8 text-sm text-gray-600 leading-relaxed text-justify">
            Your personal data will be used to support your experience throughout this website.
          </p>

          <button 
            onClick={handlePlaceOrder} // 6. Trigger Modal
            disabled={cartItems.length === 0}
            className={`w-full border border-black px-16 py-4 rounded-xl text-xl transition-all ${
              cartItems.length === 0 
                ? "opacity-30 cursor-not-allowed" 
                : "hover:bg-black hover:text-white"
            }`}
          >
            Place order
          </button>
        </section>
      </div>

      {/* 7. POP-UP MODAL UI */}
      {showModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-4">
              <CheckCircle size={80} className="text-[#2EC1AC]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Success!</h2>
            <p className="text-gray-500 mb-8">
              Your order has been placed successfully. Thank you for shopping with us!
            </p>
            <button 
              onClick={() => navigate("/")}
              className="w-full bg-[#B88E2F] text-white py-3 rounded-lg font-bold hover:bg-[#a17a2a] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckOut;