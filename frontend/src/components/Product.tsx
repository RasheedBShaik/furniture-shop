import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, Star } from "lucide-react";

import type { IProduct } from "../pages/Home";
import { useCart } from "./Context";

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart, toggleLike, likedItems } = useCart(); // 2. Destructure functions
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if current product is in the liked list
  const isLiked = likedItems.some((item) => item._id === product?._id);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product data");
        const json = await response.json();

        if (json.success) {
          setProduct(json.data);
        } else {
          throw new Error(json.message || "Product not found");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-xl font-medium">Loading...</div>;
  if (error || !product) return <div className="h-screen flex items-center justify-center text-red-500 font-medium">Error: {error || "Product Not Found"}</div>;

  return (
    <div className="max-w-360 mx-auto px-4 md:px-20 py-10 not-italic">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-4 text-gray-500 mb-10 bg-[#F9F1E7] py-6 px-4 md:px-10 rounded-sm">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={18} />
        <Link to="/shop" className="hover:text-black transition-colors">Shop</Link>
        <ChevronRight size={18} />
        <span className="border-l-2 border-gray-400 pl-4 text-black font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Product Image */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#F9F1E7] rounded-lg overflow-hidden h-125">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-normal text-black">{product.name}</h1>

          <div className="flex items-center gap-4">
            <p className="text-2xl font-medium text-[#B88E2F]">Rs. {product.price.toLocaleString()}</p>
            {product.originalPrice != null && product.originalPrice > 0 && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
          </div>

          <div className="flex items-center gap-4 py-2 border-b border-gray-200 pb-4">
            <div className="flex text-[#FFC700]">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} fill="currentColor" size={18} />)}
            </div>
            <span className="text-xs text-gray-400 border-l pl-4">5 Customer Reviews</span>
          </div>

          <p className="text-base text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>

          <div className="flex flex-col gap-2 mt-4 text-sm">
            <p><span className="text-gray-400">Category:</span> {product.category}</p>
            <p><span className="text-gray-400">Availability:</span> {product.stock && product.stock > 0 ? `${product.stock} In Stock` : "Out of Stock"}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product)} // 3. Connect addToCart
              disabled={!product.stock || product.stock < 1}
              className="flex text-center md:flex-none border border-black rounded-xl px-12 py-3 hover:bg-black hover:text-white transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add To Cart
            </button>

            <button 
              onClick={() => toggleLike(product)} // 4. Connect toggleLike
              className="group flex items-center gap-2 md:flex-none border border-black rounded-xl px-12 py-3 hover:bg-black hover:text-white transition-all font-medium"
            >
              <span className={isLiked ? "text-red-500" : ""}>{isLiked ? "Liked" : "Like"}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 28 28"
                fill={isLiked ? "#ef4444" : "none"} // Red fill if liked
                xmlns="http://www.w3.org/2000/svg"
                className="transition-colors duration-300"
              >
                <path
                  d="M8.16659 3.5C4.94542 3.5 2.33325 6.08533 2.33325 9.275C2.33325 11.8498 3.35409 17.9608 13.4026 24.1383C13.5826 24.2479 13.7892 24.3058 13.9999 24.3058C14.2106 24.3058 14.4173 24.2479 14.5973 24.1383C24.6458 17.9608 25.6666 11.8498 25.6666 9.275C25.6666 6.08533 23.0544 3.5 19.8333 3.5C16.6121 3.5 13.9999 7 13.9999 7C13.9999 7 11.3878 3.5 8.16659 3.5Z"
                  className={`${isLiked ? "stroke-red-500" : "stroke-black group-hover:stroke-white"} transition-colors duration-300`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;