import React from "react";
import { Search, Heart, Wallpaper } from "lucide-react";

const Navbar = ({
  onSearch,
  query,
  setquery,
  shofavorite,
  setshofavorite,
  favorites
}) => {

  return (
    <div>
      <nav className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center gap-2">
              <Wallpaper size={33} color="#6044c5" />
              <span className="text-2xl font-bold text-white">Wallpaper</span>
            </div>

            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <Search
                  size={30}
                  color="#6044c5"
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setquery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSearch()}
                  placeholder="Search Images..."
                  className="w-full bg-zinc-800/80 text-white rounded-full py-2 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-700"
                />

                <button
                  onClick={onSearch}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-700 to-purple-700 text-white px-4 py-1 rounded-2xl cursor-pointer"
                >
                  Go
                </button>
              </div>
            </div>

            {/* ❤️ Favorites Button */}
            <button
              onClick={() => setshofavorite(!shofavorite)}
              className="relative bg-gradient-to-r from-violet-700 to-purple-700 text-white px-5 py-2 rounded-full cursor-pointer"
            >
              <Heart
                className="inline-block mr-1.5"
                size={20}
                fill={shofavorite ? "currentColor" : "none"}
              />

              Favorites

              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </button>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
