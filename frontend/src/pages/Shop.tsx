import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { IProduct } from "./Home";
import ProductCard from "../components/ProductCard";
import Banner from "../components/Banner";

const Shop = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 1. URL search params to read ?category=Living
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category");

  // Updated to match your request
  const categories = ["Dining", "Living", "Bedroom"];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // 2. Fetch based on category if it exists
        const url = activeCategory 
          ? `/api/products?category=${activeCategory}` 
          : "/api/products";
          
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]); // Re-run fetch whenever the category in the URL changes

  // Helper to toggle categories
  const handleCategoryClick = (cat: string) => {
    if (activeCategory === cat) {
      setSearchParams({}); // Clear filter if clicking the active one
    } else {
      setSearchParams({ category: cat }); // Set new category in URL
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-6 px-4">
      {/* Header Banner */}
      <div className="bg-[url(images/shop-hero.png)] bg-cover bg-center flex items-center justify-center flex-col h-80 py-12 mb-10 text-center rounded-sm">
              <h1 className="text-4xl font-bold text-gray-800 not-italic">Shop</h1>
              <p className="mt-2 not-italic">
                <Link to="/" className="hover:text-[#B88E2F] text-lg font-semibold">Home</Link> &gt;{" "}
                <span>
                  <Link to="/shop" className="text-gray-800">Shop</Link>
                </span>
              </p>
            </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center justify-between bg-[#F9F1E7] p-6 mb-10 rounded-sm">
        <div className="flex flex-wrap gap-6 items-center">
          <span className="font-semibold text-[#242424]">Filter by Category:</span>
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setSearchParams({})}
              className={`px-6 py-2 rounded-sm transition-all border ${
                !activeCategory 
                ? 'bg-[#B88E2F] text-white border-[#B88E2F]' 
                : 'bg-white text-gray-700 border-gray-300 hover:border-[#B88E2F]'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-6 py-2 rounded-sm transition-all border ${
                  activeCategory === cat 
                  ? 'bg-[#B88E2F] text-white border-[#B88E2F]' 
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#B88E2F]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="text-gray-600 font-medium">
          Showing {products.length} {products.length === 1 ? 'result' : 'results'}
        </div>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex justify-center items-center py-32">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]"></div>
        </div>
      ) : (
        <>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-gray-50 rounded-lg">
              <h3 className="text-2xl text-gray-400 mb-4">No products found in `{activeCategory ||  "Store"}`</h3>
              <button 
                onClick={() => setSearchParams({})} 
                className="bg-[#B88E2F] text-white px-8 py-3 rounded-sm hover:bg-[#967328] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </>
      )}
      
      <div className="mt-20">
        <Banner />
      </div>
    </div>
  );
};

export default Shop;