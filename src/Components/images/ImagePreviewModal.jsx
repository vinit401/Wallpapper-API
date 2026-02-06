import React, { useState } from "react";
import { X, Heart, Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";

const ImagePreviewModal = ({ images, startIndex, onClose, toggleFavorite, isFavorite }) => {

  const [index, setIndex] = useState(startIndex);
  const img = images[index];

  if (!img) return null;

  const liked =
    typeof isFavorite === "function" ? isFavorite(img.id) : false;

  const handleDownload = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `wallpaper-${Date.now()}.jpg`;
    link.click();
  };

  const next = () => {
    if (index < images.length - 1) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">

      <button onClick={onClose} className="absolute top-5 right-5 text-white">
        <X size={35}/>
      </button>

      {/* Left */}
      <button onClick={prev} className="absolute left-5 text-white">
        <ChevronLeft size={45}/>
      </button>

      {/* Right */}
      <button onClick={next} className="absolute right-5 text-white">
        <ChevronRight size={45}/>
      </button>

      <div className="max-w-5xl w-full px-6">

        <img
          src={img.largeImageURL || img.webformatURL}
          className="w-full max-h-[75vh] object-contain rounded-lg"
        />

        <div className="flex justify-between items-center mt-5 text-white">

          {/* User */}
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 bg-purple-700 rounded-full flex items-center justify-center font-bold">
              {img.user.charAt(0).toUpperCase()}
            </div>
            <p className="font-bold">{img.user}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-5 items-center">

            <button onClick={() => toggleFavorite(img)}>
              <Heart
                size={20}
                fill={liked ? "currentColor" : "none"}
                className={liked ? "text-red-500" : "text-white"}
              />
            </button>

            <span className="flex gap-1 items-center">
              <Eye size={18}/> {img.views}
            </span>

            {/* QUALITY DOWNLOAD */}
            <button
              onClick={()=>handleDownload(img.webformatURL)}
              className="bg-zinc-700 px-3 py-1 rounded"
            >
              Normal
            </button>

            <button
              onClick={()=>handleDownload(img.largeImageURL)}
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
