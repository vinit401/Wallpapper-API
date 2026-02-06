import React from "react";
import { useState } from "react";
import { PixabayService } from "../services/pixabay.service";
import { ENV } from "../config/env";

export const useImageFetch = () => {
  const [images, setimages] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingMore, setloadingMore] = useState(false);
  const [error, seterror] = useState(null);
  const [hasMore, sethasMore] = useState(true);
  // const [page, setpage] = useState(1);
  // const [searchQuery, setsearchQuery] = useState("");
  const fetchImages = async (searchQuery, pageNum = 1, append = false) => {
    if (append) {
      setloadingMore(true);
      await new Promise((resolve) => setTimeout(resolve, ENV.LOAD_MORE_DELAY));
    } else {
      setloading(true);
    }
    seterror(null);

    try {
      const perPage = append ? ENV.PER_PAGE_LOAD_MORE : ENV.PER_PAGE_INTIAL;
      const data = await PixabayService.fetchImages(
        searchQuery,
        pageNum,
        perPage,
      );
      if (data.hits && data.hits.length > 0) {
        if (append) {
          setimages((prev) => [...prev, ...data.hits]);
        } else {
          setimages(data.hits);
        }
        sethasMore(data.hits.length === perPage);
      } else {
        seterror("No images found.");
        sethasMore(false);
      }
    } catch (err) {
      seterror(err.message || "An error occurred while fetching images.");
      sethasMore(false);
    } finally {
      setloading(false);
      setloadingMore(false);
    }
  };
  const resetImages = () => {
    setimages([]);
    sethasMore(true);
  };
  return {
    images,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchImages,
    resetImages,
  };
};
