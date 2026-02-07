import React, { useState } from "react";
import { X, Heart, Eye, ChevronLeft, ChevronRight } from "lucide-react";

const ImagePreviewModal = ({
  images,
  startIndex,
  onClose,
  toggleFavorite,
  isFavorite,
}) => {
  const [index, setIndex] = useState(startIndex);
  const img = images[index];

  if (!img) return null;

  const liked = isFavorite(img.id);

  const download = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "wallpaper.jpg";
    a.click();
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const next = () => {
    if (index < images.length - 1) setIndex(index + 1);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-2">

      {/* ❌ Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-50"
      >
        <X size={30} />
      </button>

      {/* ◀ LEFT ARROW (mobile + desktop) */}
      <button
        onClick={prev}
        className="
          absolute left-2 sm:left-4
          top-1/2 -translate-y-1/2
          bg-black/50 text-white
          p-2 sm:p-3
          rounded-full
          hover:bg-black/70
          transition
        "
      >
        <ChevronLeft size={22} className="sm:hidden" />
        <ChevronLeft size={40} className="hidden sm:block" />
      </button>

      {/* ▶ RIGHT ARROW (mobile + desktop) */}
      <button
        onClick={next}
        className="
          absolute right-2 sm:right-4
          top-1/2 -translate-y-1/2
          bg-black/50 text-white
          p-2 sm:p-3
          rounded-full
          hover:bg-black/70
          transition
        "
      >
        <ChevronRight size={22} className="sm:hidden" />
        <ChevronRight size={40} className="hidden sm:block" />
      </button>

      {/* CONTENT */}
      <div className="max-w-4xl w-full">

        <img
          src={img.largeImageURL || img.webformatURL}
          className="w-full max-h-[70vh] object-contain rounded"
        />

        <div className="flex flex-col sm:flex-row justify-between mt-4 text-white gap-4">
          <div className="font-bold">{img.user}</div>

          <div className="flex flex-wrap gap-3 items-center text-sm">

            <button onClick={() => toggleFavorite(img)}>
              <Heart
                size={18}
                fill={liked ? "currentColor" : "none"}
                className={liked ? "text-red-500" : "text-white"}
              />
            </button>

            <span className="flex items-center gap-1">
              <Eye size={16} /> {img.views}
            </span>

            <button
              onClick={() => download(img.webformatURL)}
              className="bg-zinc-700 px-3 py-1 rounded"
            >
              Normal
            </button>

            <button
              onClick={() => download(img.largeImageURL)}
              className="bg-purple-700 px-3 py-1 rounded"
            >
              HD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
