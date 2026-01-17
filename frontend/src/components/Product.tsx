import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";

import type { IProduct } from "../pages/Home";
import { useCart } from "./Context";

// Dynamically detect backend URL
const getApiBase = () => {
  if (window.location.hostname === "localhost") {
    return "http://localhost:5000"; // local backend
  }
  return "https://furniture-shop-xsj0.onrender.com"; // production backend
};

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart, toggleLike, likedItems } = useCart();
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isLiked = likedItems.some((item) => item._id === product?._id);

  useEffect(() => {
    if (!id) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const API_BASE = getApiBase();
        const response = await fetch(`${API_BASE}/api/products/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch product: ${response.status}`);

        const json = await response.json();
        if (json.success && json.data) {
          isMounted && setProduct(json.data);
        } else {
          throw new Error(json.message || "Product not found");
        }
      } catch (err: any) {
        console.error("Fetch error:", err);
        isMounted && setError(err.message || "Failed to load product");
      } finally {
        isMounted && setLoading(false);
      }
    };

    fetchProduct();

    return () => { isMounted = false; };
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-xl font-medium">Loading...</div>;
  if (error || !product) return <div className="h-screen flex items-center justify-center text-red-500 font-medium">Error: {error || "Product Not Found"}</div>;

  return (
    <div className="max-w-360 mx-auto px-4 md:px-20 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-4 text-gray-500 mb-10 bg-[#F9F1E7] py-6 px-4 md:px-10 rounded-sm">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={18} />
        <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
        <ChevronRight size={18} />
        <span className="border-l-2 border-gray-400 pl-4 text-black font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Image */}
        <div className="bg-[#F9F1E7] rounded-lg overflow-hidden h-125">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-normal">{product.name}</h1>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-medium text-[#B88E2F]">Rs. {product.price.toLocaleString()}</p>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 py-2 border-b border-gray-200 pb-4">
            <div className="flex text-[#FFC700]">
              {[1,2,3,4,5].map((s) => <Star key={s} fill="currentColor" size={18} />)}
            </div>
            <span className="text-xs text-gray-400 border-l pl-4">5 Customer Reviews</span>
          </div>

          <p className="text-gray-600 mt-4">{product.description}</p>

          <div className="flex flex-col gap-2 mt-4 text-sm">
            <p><span className="text-gray-400">Category:</span> {product.category}</p>
            <p><span className="text-gray-400">Availability:</span> {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock < 1}
              className="border border-black rounded-xl px-12 py-3 hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add To Cart
            </button>

            <button 
              onClick={() => toggleLike(product)}
              className="border border-black rounded-xl px-12 py-3 hover:bg-black hover:text-white transition-all flex items-center gap-2"
            >
              <span className={isLiked ? "text-red-500" : ""}>{isLiked ? "Liked" : "Like"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
