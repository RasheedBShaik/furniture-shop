import { useEffect, useState } from "react";

const Home = () => {
  // 1. Create state to store the products
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 2. Fetch data from backend when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        
        // Assuming your backend returns { success: true, data: [...] }
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
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Home - Featured Products</h1>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div key={product._id} className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {/* Product Image Placeholder */}
              <div className="bg-gray-100 h-48 w-full rounded-md mb-4 flex items-center justify-center">
                {product.image ? (
                  <img src={product.image} alt={product.name} className="h-full object-cover" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              {/* Product Info using your Gold color */}
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-[#B88E2F] font-bold mt-2">Rs. {product.price}</p>
              <p> {product.description}</p>
            </div>
          ))}
        </div>
      )}

      {products.length === 0 && !loading && (
        <p className="text-gray-500">No products found. Add some in the backend!</p>
      )}
    </div>
  );
};

export default Home;