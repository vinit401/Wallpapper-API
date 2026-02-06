import React, { useState } from "react";
import { Download, Heart, Eye } from "lucide-react";
import ImagePreviewModal from "./ImagePreviewModal";

const ImageCard = ({ img, onToggleFavorite, isFavorite }) => {

  const [showPreview, setShowPreview] = useState(false);

  const handleDownload = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `wallpaper-${Date.now()}.jpg`;
    link.click();
  };

  return (
    <>
      <div 
        className="group relative break-inside-auto mb-4 cursor-pointer"
        onClick={() => setShowPreview(true)}
      >

        <div className="relative overflow-hidden rounded-lg bg-zinc-800">

          <img
            src={img.webformatURL}
            className="w-full h-auto group-hover:scale-110 transition duration-700"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />

          {/* ⬇ Download */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(img.largeImageURL || img.webformatURL);
            }}
            className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-md opacity-0 group-hover:opacity-100"
          >
            <Download size={20} />
          </button>

          {/* ❤️ Favorite */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(img);
            }}
            className="absolute top-2 left-2 bg-black/60 text-white p-2 rounded-md opacity-0 group-hover:opacity-100"
          >
            <Heart
              size={20}
              fill={isFavorite ? "currentColor" : "none"}
              className={isFavorite ? "text-red-500" : "text-white"}
            />
          </button>

          {/* Stats */}
          <div className="absolute bottom-2 left-2 right-2 flex justify-between text-white text-xs opacity-0 group-hover:opacity-100">
            <span className="flex gap-1 items-center">
              <Heart size={14} /> {img.likes}
            </span>
            <span className="flex gap-1 items-center">
              <Eye size={14} /> {img.views}
            </span>
          </div>
        </div>
      </div>

      {/* 🔥 Preview Modal (NOW CONNECTED TO FAVORITES) */}
      {showPreview && (
        <ImagePreviewModal
          img={img}
          onClose={() => setShowPreview(false)}
          toggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </>
  );
};

export default ImageCard;
