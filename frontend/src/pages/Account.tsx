import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { IProduct } from "./Home";

const Account = () => {
  // --- Auth State ---
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- Data State ---
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  // --- Filter State ---
  const [adminFilter, setAdminFilter] = useState("All");
  const categories = ["Dining", "Living", "Bedroom"];

  // --- Form State ---
  const [formData, setFormData] = useState<IProduct>({
    id: "",
    _id: "",
    name: "",
    price: 0,
    originalPrice: 0,
    stock: 0,
    image: "",
    description: "",
    category: "",
    label: "",
  });

  // --- API Functions ---
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://furniture-shop-xsj0.onrender.com/api/products");
      const data = await res.json();
      if (data.success) setProducts(data.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `https://furniture-shop-xsj0.onrender.com/api/products/${editingId}` : "https://furniture-shop-xsj0.onrender.com/api/products";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        fetchProducts();
        resetForm();
        alert(
          editingId
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
      }
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`https://furniture-shop-xsj0.onrender.com/api/products/${id}`, { method: "DELETE" });
      if (res.ok) setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      _id: "",
      name: "",
      price: 0,
      originalPrice: 0,
      stock: 0,
      image: "",
      description: "",
      category: "",
      label: "",
    });
    setEditingId(null);
  };

  // --- Filter Logic ---

  const filteredProducts =
    adminFilter === "All"
      ? products
      : products.filter((p) => {
          const productCat = p.category?.toLowerCase() || "";
          const filterCat = adminFilter.toLowerCase();
          return productCat.includes(filterCat);
        });

  // --- ADMIN DASHBOARD VIEW ---
  if (isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto my-8 p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">
          Inventory Manager
        </h1>

        {/* --- FORM SECTION --- */}
        <form
          onSubmit={handleSave}
          className="bg-[#FFF3E3] p-8 rounded-xl shadow-sm border border-[#B88E2F]/20 mb-12 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            className="border p-3 rounded-md focus:outline-[#B88E2F]"
            placeholder="Product Name !"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <select
            className="border text-[#777777] border-black p-3 rounded-md focus:outline-[#B88E2F]"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          >
            <option disabled value="">
              Select Category !
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input
            className="border p-3 rounded-md focus:outline-[#B88E2F]"
            type="number"
            placeholder="Price !"
            value={formData.price || ""}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            required
          />

          <input
            className="border p-3 rounded-md focus:outline-[#B88E2F]"
            placeholder="Label (e.g. 30%)"
            value={formData.label}
            onChange={(e) =>
              setFormData({ ...formData, label: e.target.value })
            }
          />

          <input
            className="border p-3 rounded-md focus:outline-[#B88E2F]"
            type="number"
            placeholder="Original Price"
            value={formData.originalPrice || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                originalPrice: Number(e.target.value),
              })
            }
          />
          <input
            type="number"
            min="0"
            className="border p-3 rounded-md focus:outline-[#B88E2F]"
            placeholder="Number of products (e.g. 30)"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: Number(e.target.value) })
            }
          />

          <input
            className="border p-3 rounded-md md:col-span-3 focus:outline-[#B88E2F]"
            placeholder="Image URL !"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            required
          />

          <textarea
            className="border p-3 rounded-md md:col-span-3 focus:outline-[#B88E2F]"
            placeholder="Description !"
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />

          <div className="md:col-span-3 flex gap-3 mt-2">
            <button
              type="submit"
              className="flex-1 bg-[#B88E2F] text-white cursor-pointer py-3 rounded-md font-bold hover:bg-[#a47e2a] transition-all shadow-md"
            >
              {editingId ? "Update Product" : "Add New Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="px-8 bg-gray-200 py-3 rounded-md font-semibold text-gray-700 hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* --- FILTER BAR --- */}
        <div className="flex flex-wrap items-center justify-between bg-[#F9F1E7] p-6 mb-10 rounded-sm">
          <div className="flex flex-wrap gap-6 items-center">
            <span className="font-semibold text-[#242424]">
              Filter by Category:
            </span>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setAdminFilter("All")}
                className={`px-6 py-2 rounded-sm transition-all border ${
                  adminFilter === "All"
                    ? "bg-[#B88E2F] text-white border-[#B88E2F]"
                    : "bg-white text-gray-700 border-gray-300 hover:border-[#B88E2F]"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAdminFilter(cat)}
                  className={`px-6 py-2 rounded-sm transition-all border ${
                    adminFilter === cat
                      ? "bg-[#B88E2F] text-white border-[#B88E2F]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#B88E2F]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="text-gray-600 font-medium">
            Showing {filteredProducts.length} results
          </div>
        </div>

        {/* --- LIST SECTION --- */}
        {loading ? (
          <div className="flex justify-center py-10 text-[#B88E2F] font-bold">
            Loading Inventory...
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product._id} className="flex flex-col gap-2 group">
                <ProductCard product={product} />
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(product._id || null);
                      setFormData({ ...product });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex-1 bg-blue-300 text-white py-2 rounded-sm font-semibold hover:bg-blue-400 transition-all text-sm shadow-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id || "")}
                    className="flex-1 bg-red-300 text-white py-2 rounded-sm font-semibold hover:bg-red-400 transition-all text-sm shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredProducts.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            No products found.
          </div>
        )}
      </div>
    );
  }

  // --- LOGIN VIEW ---
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="p-10 bg-white border border-[#B88E2F]/20 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-[#B88E2F]">
          Admin Login
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Convert both inputs to lowercase to handle all case variations
            if (
              username.toLowerCase() === "admin" &&
              password.toLowerCase() === "password"
            ) {
              setIsLoggedIn(true);
            } else alert("Access Denied");
          }}
          className="flex flex-col gap-5"
        >
          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-[#B88E2F] outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-[#B88E2F] outline-none"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="bg-[#B88E2F] text-white py-3 rounded-lg font-bold text-lg hover:shadow-lg transition-all active:scale-95">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Account;
