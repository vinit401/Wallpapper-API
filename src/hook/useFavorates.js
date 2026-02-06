import { useState } from "react";
import { StorageService } from "../services/storage.service";
import { STORAGE_KEY } from "../config/env";

export const useFavorites = () => {

  const [favorites, setfavorites] = useState(() => {
    return StorageService.get(STORAGE_KEY) || [];
  });

  const toggleFavorite = (img) => {

    setfavorites((prev) => {

      const exists = prev.some((fav) => fav.id === img.id);

      const newFavorites = exists
        ? prev.filter((fav) => fav.id !== img.id)
        : [...prev, img];

      StorageService.set(STORAGE_KEY, newFavorites);

      return newFavorites;
    });
  };

  const isFavorite = (imgId) => {
    return favorites.some((fav) => fav.id === imgId);
  };

  // 🔥 THIS WAS MISSING
  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
};
