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

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        {/* <main className="mx-auto max-w-full border-2 max-w-46.25>" */}
          <main className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header is outside Routes so it stays at the top of every page */}
        <Header />

        {/* Routes acts like a switch: it only renders ONE route at a time */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/account" element={<Account/>}/>
          <Route path="/search" element={<Search/>} />
          <Route path="/liked" element={<Liked/>}/>
          <Route path="/cart" element={<Cart/>} />
        </Routes>

        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;