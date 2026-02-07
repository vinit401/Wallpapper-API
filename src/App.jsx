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

  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const {
    images,
    loading,
    loadingMore,
    hasMore,
    fetchImages,
    resetImages,
  } = useImageFetch();

  useEffect(() => {
    fetchImages(query, 1, false);
  }, [query]);

  useEffect(() => {
    if (page > 1) fetchImages(query, page, true);
  }, [page]);

  useInfiniteScroll(() => {
    if (!loadingMore && hasMore && !loading) {
      setpage((prev) => prev + 1);
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

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {loading ? (
          <SkeletonGrid />
        ) : (
          <>
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

            {loadingMore && !shofavorite && (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-2 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
              </div>
            )}

            {!hasMore && images.length > 0 && !shofavorite && (
              <p className="text-center text-gray-600 py-10">
                That’s all for now
              </p>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default App;
