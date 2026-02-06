import React, { useEffect, useState } from "react";
import Navbar from "./Components/images/layout/Navbar";
import Categories from "./Components/images/layout/Categories";
import ImageGrid from "./Components/images/ImageGrid";
import SkeletonGrid from "./Components/images/SkeletonGrid";
import { useImageFetch } from "./hook/useImageFetch";
import { useInfiniteScroll } from "./hook/useInfiniteScroll";
import { useFavorites } from "./hook/useFavorates";

const App = () => {

  const [query, setquery] = useState("london");
  const [page, setpage] = useState(1);
  const [shofavorite, setshofavorite] = useState(false);

  // ❤️ Favorites Hook
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  // 📸 Images Hook
  const {
    images,
    loading,
    loadingMore,
    hasMore,
    fetchImages,
    resetImages,
  } = useImageFetch();

  // 🔍 Initial + search load
  useEffect(() => {
    fetchImages(query, 1, false);
  }, [query]);

  // ♾ Load more pages
  useEffect(() => {
    if (page > 1) {
      fetchImages(query, page, true);
    }
  }, [page]);

  // 📜 Infinite scroll handler
  useInfiniteScroll(() => {
    if (!loadingMore && hasMore && !loading) {
      setpage(prev => prev + 1);
    }
  }, [hasMore, loadingMore, loading]);

  const handleSearch = () => {
    if (!query.trim()) return;

    setpage(1);
    resetImages();
    setshofavorite(false);
    fetchImages(query, 1, false);
  };

  const handleCategoryClick = (cat) => {
    const searchTerm = cat === "Trending" ? "Nature" : cat;

    setquery(searchTerm);
    setpage(1);
    resetImages();
    setshofavorite(false);
    fetchImages(searchTerm, 1, false);
  };

  // ⭐ Switch data source
  const displayImages = shofavorite ? favorites : images;

  return (
    <div className="min-h-screen bg-zinc-900">

      <Navbar
        onSearch={handleSearch}
        query={query}
        setquery={setquery}
        favorites={favorites}
        shofavorite={shofavorite}
        setshofavorite={setshofavorite}
      />

      <Categories handleCategoryClick={handleCategoryClick} />

      <main className="max-w-6xl mx-auto px-8 py-8">

        {/* 🔥 PREMIUM SKELETON LOADER */}
        {loading ? (
          <SkeletonGrid />
        ) : (
          <>
            {/* ⭐ EMPTY FAVORITES MESSAGE */}
            {shofavorite && favorites.length === 0 ? (
              <div className="text-center py-20 text-gray-400 text-lg animate-pulse">
                ❤️ Like to add photos to favorites
              </div>
            ) : (
              <ImageGrid
                images={displayImages}
                toggleFavorite={toggleFavorite}
                isFavorite={isFavorite}
              />
            )}

            {/* ♾ Load more animation */}
            {loadingMore && !shofavorite && (
              <div className="flex flex-col items-center py-12">
                <div className="w-10 h-10 border-3 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
                <p className="text-gray-500 text-sm mt-4">
                  Loading more images...
                </p>
              </div>
            )}

            {!hasMore && images.length > 0 && !shofavorite && (
              <div className="text-center py-12">
                <p className="text-gray-700 text-sm">
                  That's all for now
                </p>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
};

export default App;
