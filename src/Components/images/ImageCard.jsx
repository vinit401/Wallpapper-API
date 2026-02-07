import React, { useState } from "react";
import { Download, Heart, Eye } from "lucide-react";
import ImagePreviewModal from "./ImagePreviewModal";

const ImageCard = ({ img, index, images, onToggleFavorite, isFavorite }) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "wallpaper.jpg";
    link.click();
  };

  return (
    <>
      {/* CARD */}
      <div
        onClick={() => setShowPreview(true)}
        className="relative cursor-pointer rounded-xl overflow-hidden bg-zinc-800 mb-4"
      >
        {/* 🔥 FIXED IMAGE WRAPPER */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[3/4]">
          <img
            src={img.webformatURL}
            alt={img.tags}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition" />

        {/* ❤️ Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(img);
          }}
          className="absolute top-2 left-2 bg-black/60 p-2 rounded-md"
        >
          <Heart
            size={18}
            fill={isFavorite(img.id) ? "currentColor" : "none"}
            className={isFavorite(img.id) ? "text-red-500" : "text-white"}
          />
        </button>

        {/* ⬇ Download */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload(img.largeImageURL || img.webformatURL);
          }}
          className="absolute top-2 right-2 bg-black/60 p-2 rounded-md"
        >
          <Download size={18} className="text-white" />
        </button>

        {/* Stats */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between text-xs text-white">
          <span className="flex gap-1 items-center">
            <Heart size={14} /> {img.likes}
          </span>
          <span className="flex gap-1 items-center">
            <Eye size={14} /> {img.views}
          </span>
        </div>
      </div>

      {/* 🔍 PREVIEW */}
      {showPreview && (
        <ImagePreviewModal
          images={images}
          startIndex={index}
          onClose={() => setShowPreview(false)}
          toggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </>
  );
};

export default ImageCard;
