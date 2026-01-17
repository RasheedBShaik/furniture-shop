import React, { createContext, useContext, useState, useEffect } from "react";
import type { IProduct } from "../pages/Home";

// Extend IProduct to include quantity for the cart
export interface ICartItem extends IProduct {
  quantity: number;
}

interface CartContextType {
  cartItems: ICartItem[];
  likedItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  toggleLike: (product: IProduct) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // Load initial data from LocalStorage
  const [cartItems, setCartItems] = useState<ICartItem[]>(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [likedItems, setLikedItems] = useState<IProduct[]>(() => {
    const saved = localStorage.getItem("liked");
    return saved ? JSON.parse(saved) : [];
  });

  // Sync to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("Like", JSON.stringify(likedItems));
  }, [likedItems]);

  const addToCart = (product: IProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const toggleLike = (product: IProduct) => {
    setLikedItems((prev) => {
      const isLiked = prev.some((item) => item._id === product._id);
      if (isLiked) return prev.filter((item) => item._id !== product._id);
      return [...prev, product];
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, likedItems, addToCart, removeFromCart, updateQuantity, toggleLike }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};