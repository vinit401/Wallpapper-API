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
    <nav className="bg-black/60 border-b border-white/10 sticky top-0 z-40 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center gap-4">

        {/* LOGO */}
        <div className="flex items-center gap-2 shrink-0">
          <Wallpaper size={28} className="text-purple-500" />
          <span className="font-bold text-white hidden sm:block">
            Wallpaper
          </span>
        </div>

        {/* 🔍 SEARCH – FULL WIDTH ON DESKTOP */}
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400"
          />

          <input
            value={query}
            onChange={(e) => setquery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Search wallpapers..."
            className="
              w-full
              bg-zinc-800 text-white
              rounded-full
              py-2.5
              pl-12
              pr-14 sm:pr-28
              focus:outline-none
              focus:ring-2
              focus:ring-purple-700
            "
          />

          {/* GO BUTTON – DESKTOP */}
          <button
            onClick={onSearch}
            className="
              hidden sm:flex
              absolute right-2 top-1/2 -translate-y-1/2
              bg-gradient-to-r from-violet-600 to-purple-700
              text-white
              px-6 py-1.5
              rounded-full
              text-sm font-medium
            "
          >
            Go
          </button>

          {/* SEARCH ICON – MOBILE */}
          <button
            onClick={onSearch}
            className="sm:hidden absolute right-4 top-1/2 -translate-y-1/2 text-purple-400"
          >
            <Search size={18} />
          </button>
        </div>

        {/* ❤️ FAVORITES */}
        <button
          onClick={() => setshofavorite(!shofavorite)}
          className="relative bg-gradient-to-r from-violet-600 to-purple-700 px-4 py-2 rounded-full text-white shrink-0"
        >
          <Heart
            size={18}
            fill={shofavorite ? "currentColor" : "none"}
          />

          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {favorites.length}
            </span>
          )}
        </button>

      </div>
    </nav>
  );
};

export default Navbar;
