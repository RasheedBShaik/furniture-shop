import { HeartOff, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../components/Context";

const Liked = () => {
  const { likedItems, toggleLike, addToCart } = useCart();

  return (
    <div className="max-w-360 mx-auto px-4 md:px-20 py-16">
      <h1 className="text-4xl font-bold mb-10">My Wishlist</h1>
      
      {likedItems.length === 0 ? (
        <div className="text-center py-20 bg-[#F9F1E7] rounded-lg">
          <p className="text-gray-500 mb-6">Your wishlist is empty.</p>
              <Link to="/shop" className="bg-[#B88E2F] text-white px-8 py-3 rounded-md text-sm">Return To Shop</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {likedItems.map((item) => (
            <div key={item._id} className="group border rounded-lg overflow-hidden relative">
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-[#B88E2F] font-bold">Rs. {item.price.toLocaleString()}</p>
                
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => addToCart(item)}
                    className="flex-1 bg-[#B88E2F] text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-black transition-all"
                  >
                    <ShoppingCart size={18} /> Add to Cart
                  </button>
                  <button 
                    onClick={() => toggleLike(item)}
                    className="p-2 border border-red-200 text-red-500 rounded-md hover:bg-red-50"
                  >
                    <HeartOff size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Liked;