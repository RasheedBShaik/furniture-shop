import { BrowserRouter, Routes, Route } from "react-router-dom"; // Added Routes
import Header from "./components/Header";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Account from "./pages/Account";
import Search from "./pages/Search";
import Liked from "./pages/Liked";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ProductPage from "./components/Product";
import { CartProvider } from "./components/Context";
import React from "react";
import CheckOut from "./pages/CheckOut";

function App() {
  return (
    <React.StrictMode>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-white italic">
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-12">
              <ScrollToTop />
              {/* Header is outside Routes so it stays at the top of every page */}

              <Header />
              {/* Routes acts like a switch: it only renders ONE route at a time */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/account" element={<Account />} />
                <Route path="/search" element={<Search />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/" element={<Home />} />
                <Route path="checkout" element={<CheckOut/>}/>
                {/* This :id allows any ID to be passed in the URL */}
                <Route path="/product/:id" element={<ProductPage />} />
                {/* </Routes> */}
              </Routes>
              {/* bottom is outside Routes so it stays at the bottom of every page */}
              <Footer />
            </main>
          </div>
        </BrowserRouter>
      </CartProvider>
    </React.StrictMode>
  );
}

export default App;
