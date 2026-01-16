import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Heart, Share2, Check } from "lucide-react";
import type { IProduct } from "../pages/Home";
import { useCart } from "./Context";

const ProductCard = ({ product }: { product: IProduct }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const productId = product._id || product.id;

  const { addToCart, toggleLike, likedItems } = useCart();
  const [copied, setCopied] = useState(false);
  // Track if the overlay should show on mobile tap
  const [showMobileOverlay, setShowMobileOverlay] = useState(false);

  const isLiked = likedItems.some((item) => item._id === productId);
  const isAccountPage = location.pathname.toLowerCase().startsWith("/account");

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevents closing the overlay accidentally
    const productUrl = `${window.location.origin}/product/${productId}`;
    navigator.clipboard.writeText(productUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      // Toggle overlay on click for mobile
      onClick={() => setShowMobileOverlay(!showMobileOverlay)}
      className={`group relative bg-[#F4F5F7] rounded-sm overflow-hidden border border-transparent transition-all duration-300 ${
        !isAccountPage ? "hover:shadow-md" : ""
      }`}
    >
      {/* Label Badge */}
      {product.label && (
        <div
          className={`absolute top-5 right-5 h-12 w-12 rounded-full flex items-center justify-center text-white text-sm font-bold z-10 ${
            product.label.includes("-") ? "bg-[#E97171]" : "bg-[#2EC1AC]"
          }`}
        >
          {product.label}
        </div>
      )}

      {/* Product Image */}
      <div className="h-72 w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`h-full w-full object-cover transition-transform duration-500 ${
            !isAccountPage ? "group-hover:scale-110" : ""
          }`}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 bg-white">
        <h2 className="text-xl font-bold text-[#3A3A3A] mb-1 hover:text-[#B88E2F] transition-colors line-clamp-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-[#3A3A3A]">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice != null && product.originalPrice > 0 && (
            <span className="text-sm text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* Overlay: Logic updated for hover (desktop) AND state (mobile) */}
      {!isAccountPage && (
        <div
          className={`absolute inset-0 bg-[#3a3a3a]/60 flex flex-col items-center justify-center transition-opacity duration-300 z-20 
          ${
            showMobileOverlay
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${productId}`);
            }}
            className="bg-white text-[#B88E2F] px-10 py-3 font-bold hover:bg-gray-100 transition-colors text-center min-w-50 mb-3"
          >
            View Product
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="bg-[#B88E2F] text-white px-10 py-3 font-bold hover:bg-[#a17a2a] transition-colors text-center min-w-50 mb-4"
          >
            Add to cart
          </button>

          <div className="flex items-center gap-6 text-white font-semibold">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-[#B88E2F] transition-colors"
            >
              {copied ? (
                <span className="text-green-400 flex items-center gap-1">
                  <Check size={18} /> Copied
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Share2 size={18} /> Share
                </span>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(product);
              }}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? "text-red-500" : "hover:text-[#B88E2F]"
              }`}
            >
              <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
              {isLiked ? "Liked" : "Like"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
