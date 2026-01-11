import { useLocation } from "react-router-dom";
import type { IProduct } from "../pages/Home";

const ProductCard = ({ product }: { product: IProduct }) => {
  const location = useLocation();
  
  // 1. Robust check: Case-insensitive and "starts with" 
  const isAccountPage = location.pathname.toLowerCase().startsWith("/account");

  return (
    <div className={`group relative bg-[#F4F5F7] rounded-sm overflow-hidden border border-transparent transition-all duration-300 ${!isAccountPage ? 'hover:border-gray-200' : ''}`}>
      
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
          className={`h-full w-full object-cover transition-transform duration-500 ${!isAccountPage ? 'group-hover:scale-110' : ''}`}
        />
      </div>

      {/* Product Info */}
      <div className="p-4 bg-white">
        <h2 className="text-xl font-bold text-[#3A3A3A] mb-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 mb-2">{product.category}</p>
        
        <div className="flex items-center gap-3">
          <span className="text-lg font-bold text-[#3A3A3A]">
            Rs. {product.price.toLocaleString()}
          </span>
          {product.originalPrice && product.originalPrice > 0 ? (
            <span className="text-sm text-gray-400 line-through">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          ) : null}
        </div>
      </div>

      {/* 2. Hover Overlay: Only renders if NOT on account page */}
      {!isAccountPage && (
        <div className="absolute flex-col gap-4 inset-0 bg-[#3a3a3a]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white text-[#B88E2F] px-10 py-3 font-bold hover:bg-[#B88E2F] hover:text-white transition-colors">
            Add to cart
          </button>
          <button className="bg-white text-[#B88E2F] px-10 py-3 font-bold hover:bg-[#B88E2F] hover:text-white transition-colors">
            Like
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;