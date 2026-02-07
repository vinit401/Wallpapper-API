import React from "react";
import { Search, Heart, Wallpaper } from "lucide-react";

const Navbar = ({
  onSearch,
  query,
  setquery,
  shofavorite,
  setshofavorite,
  favorites,
}) => {
  return (
    <nav className="bg-black/60 border-b border-white/10 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center gap-3">
        <Wallpaper size={28} color="#7c3aed" />
        <span className="font-bold text-white">Wallpaper</span>

        <div className="hidden sm:block flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-500" />
          <input
            value={query}
            onChange={(e) => setquery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="w-full bg-zinc-800 text-white rounded-full py-2 pl-10 pr-4"
            placeholder="Search..."
          />
        </div>

        <button
          onClick={() => setshofavorite(!shofavorite)}
          className="relative bg-purple-700 px-4 py-2 rounded-full text-white"
        >
          <Heart
            size={18}
            fill={shofavorite ? "currentColor" : "none"}
          />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {favorites.length}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
