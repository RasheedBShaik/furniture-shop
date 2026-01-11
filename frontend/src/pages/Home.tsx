import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
import ProductCard from "../components/ProductCard";

export interface IProduct {
  _id: string;
  label?: string;
  image: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
}

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    const updateLimit = () => {
      const width = window.innerWidth;
      if (width < 768) setVisibleCount(4);
      else if (width >= 768 && width < 1024) setVisibleCount(6);
      else setVisibleCount(8);
    };
    updateLimit();
    window.addEventListener("resize", updateLimit);
    return () => window.removeEventListener("resize", updateLimit);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 min-h-screen flex flex-col mb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden flex items-center justify-end mt-6">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="./images/hero-1.png"
          alt="hero-1"
        />
        <div className="relative z-10 bg-[#FFF3E3] p-6 md:p-12 mx-4 max-w-137.5">
          <span className="font-semibold tracking-widest text-gray-800 uppercase text-xs md:text-sm">New Arrival</span>
          <h1 className="text-[#B88E2F] font-bold text-3xl md:text-5xl leading-tight mt-2">
            Discover Our <br /> New Collection
          </h1>
          <p className="mt-4 text-gray-700 text-sm md:text-base">
            High-quality furniture designed for your comfort and style.
          </p>
          <Link to="/shop">
            <button className="py-3 px-10 md:py-4 md:px-12 bg-[#B88E2F] text-white mt-8 font-bold hover:bg-[#a17a26] transition-colors uppercase">
              BUY NOW
            </button>
          </Link>
        </div>
      </section>

      {/* Categories Section - Now Functional */}
      <div className="text-center my-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Browse The Range</h2>
        <p className="text-[#666666]">Select a category to see our specific collections.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {/* IMPORTANT: "Livingroom" here matches your Shop filter and Backend Regex */}
          {['Dining', 'Living', 'Bedroom'].map((cat) => (
            <Link 
              key={cat} 
              to={`/shop?category=${cat}`} 
              className="group cursor-pointer block"
            >
              <div className="aspect-3/4 overflow-hidden rounded-lg">
                <img 
                  src={`/images/${cat}.png`} 
                  alt={cat} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <h3 className="mt-4 font-semibold text-lg md:text-xl group-hover:text-[#B88E2F] transition-colors">
                {cat === 'Living' ? 'Living' : cat}
              </h3>
            </Link>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800">Our Products</h2>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#B88E2F]"></div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {products.slice(0, visibleCount).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link 
              to="/shop" 
              className="border-2 border-[#B88E2F] text-[#B88E2F] px-12 md:px-20 py-3 font-bold hover:bg-[#B88E2F] hover:text-white transition-all duration-300 inline-block text-center"
            >
              Visit Shop
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;