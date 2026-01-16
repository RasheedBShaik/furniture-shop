import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../components/Banner";
import { Search as SearchIcon, X } from "lucide-react";

const Search = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState("");

  const suggestions = [
    {
      name: "Dining",
      img: "https://images.unsplash.com/photo-1617806118233-18e1db207062?w=300",
    },
    {
      name: "Living",
      img: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300",
    },
    {
      name: "Bedroom",
      img: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=300",
    },
  ];

  // Logic to handle the ENTER key
  const handleSearchSubmit = (e:any) => {
// const handleSearchSubmit = (e) => {
  e.preventDefault();
  if (query.trim()) {
    // 1. Trim and lowercase everything
    const lower = query.trim().toLowerCase();
    
    // 2. Capitalize first letter: D + ining = Dining
    const formattedQuery = lower.charAt(0).toUpperCase() + lower.slice(1);
    
    navigate(`/shop?category=${encodeURIComponent(formattedQuery)}`);
    setActive(false);
  }
};
  const handleSuggestionClick = (name: string) => {
  const formattedQuery = capitalize(name);
  navigate(`/shop?category=${encodeURIComponent(formattedQuery)}`);
  setActive(false);
};

  return (
    <div className="max-w-350 mx-auto px-4 md:px-10 my-10 font-sans text-[#111111]">
      <form onSubmit={handleSearchSubmit} className="relative mb-8 z-50">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setActive(true)}
            placeholder="What are you looking for?"
            className={`w-full py-4 pl-14 pr-12 rounded-full border-none outline-none transition-all duration-300 ${
              active
                ? "bg-white ring-2 ring-[#0058a3] shadow-2xl"
                : "bg-[#f5f5f5]"
            }`}
          />
          <SearchIcon className="absolute left-5 text-black" size={22} />

          {active && (
            <button
              type="button"
              onClick={() => {
                setActive(false);
                setQuery("");
              }}
              className="absolute right-5 p-1 hover:bg-gray-200 rounded-full"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {active && (
          <div className="absolute top-full left-0 w-full bg-white mt-2 p-6 rounded-2xl shadow-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
              Suggestions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {suggestions.map((item) => (
                <div
                  key={item.name}
                  onMouseDown={() => handleSuggestionClick(item.name)}
                  className="group cursor-pointer"
                >
                  <span className="font-bold text-sm block group-hover:underline text-left">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </form>

      {active && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
          onClick={() => setActive(false)}
        />
      )}

      <div
        className={`${
          active ? "opacity-30 pointer-events-none" : ""
        } transition-opacity duration-500`}
      >
        <Banner />
      </div>
    </div>
  );
};

export default Search;
function capitalize(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

