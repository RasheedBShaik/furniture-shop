import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Star, Loader2, Heart } from "lucide-react";
import type { IProduct } from "../pages/Home";
import { useCart } from "./Context";

// Dynamically detect backend URL based on environment
const getApiBase = () => {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    return "http://localhost:5000"; // your local backend
  }
  return "https://furniture-shop-xsj0.onrender.com"; // deployed backend
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
        const API_BASE = getApiBase();
        const url = `${API_BASE}/api/products/${id}`;
        console.log("Fetching product from:", url);

        const response = await fetch(url);

        if (!response.ok) {
          // Try to parse JSON, fallback to text
          let errorMsg = `Server Error: ${response.status}`;
          try {
            const errJson = await response.json();
            if (errJson?.message) errorMsg = errJson.message;
          } catch {}
          throw new Error(errorMsg);
        }

        const json = await response.json();
        if (!json?.success || !json?.data) {
          throw new Error(json?.message || "Product not found");
        }

        if (isMounted) setProduct(json.data);
      } catch (err: any) {
        console.error("Fetch Product Error:", err);
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-[#B88E2F]" size={40} />
        <p className="text-gray-500 font-medium italic">Loading product...</p>
      </div>
    );

  if (error || !product)
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6">
        <p className="text-red-500 font-medium text-lg">Error: {error || "Product Not Found"}</p>
        <Link
          to="/shop"
          className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800 transition-all"
        >
          Back to Shop
        </Link>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-20 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-4 text-gray-500 mb-10 bg-[#F9F1E7] py-6 px-4 md:px-10 rounded-sm overflow-x-auto whitespace-nowrap">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={18} />
        <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
        <ChevronRight size={18} />
        <span className="border-l-2 border-gray-400 pl-4 text-black font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="bg-[#F9F1E7] rounded-lg overflow-hidden h-[400px] md:h-[600px]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-normal text-gray-900">{product.name}</h1>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-semibold text-[#B88E2F]">Rs. {product.price.toLocaleString()}</p>
            {Number(product.originalPrice) > 0 && (
              <span className="text-lg text-gray-400 line-through">
                Rs. {Number(product.originalPrice).toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 py-2 border-b border-gray-200 pb-4">
            <div className="flex text-[#FFC700]">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} fill="currentColor" size={18} />)}
            </div>
            <span className="text-xs text-gray-400 border-l pl-4">5 Customer Reviews</span>
          </div>

          <p className="text-gray-600 leading-relaxed text-base md:text-lg">{product.description}</p>

          <div className="flex flex-col gap-3 text-sm border-t pt-6">
            <p><span className="text-gray-400 w-24 inline-block">Category</span>: {product.category}</p>
            <p>
              <span className="text-gray-400 w-24 inline-block">Availability</span>:
              <span className={product.stock > 0 ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
                {product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => addToCart(product)}
              disabled={product.stock < 1}
              className="flex-1 md:flex-none border border-black rounded-xl px-12 py-4 font-medium hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add To Cart
            </button>

            <button
              onClick={() => toggleLike(product)}
              className="border border-black rounded-xl px-8 py-4 hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
              <Heart size={20} className={isLiked ? "fill-red-500 text-red-500" : "group-hover:text-white"} />
              <span className="font-medium">{isLiked ? "Liked" : "Wishlist"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
