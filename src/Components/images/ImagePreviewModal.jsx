import React from "react";
import { X, Heart, Eye, Download } from "lucide-react";

const ImagePreviewModal = ({ img, onClose, toggleFavorite, isFavorite }) => {

  if (!img) return null;

  const handleDownload = async () => {
    const res = await fetch(img.largeImageURL || img.webformatURL);
    const blob = await res.blob();

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `wallpaper-${Date.now()}.jpg`;
    link.click();
  };

  const liked =
    typeof isFavorite === "function" ? isFavorite(img.id) : false;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur flex items-center justify-center z-50">

      {/* ❌ Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white hover:text-red-400 transition"
      >
        <X size={35} />
      </button>

      <div className="max-w-5xl w-full px-6">

        {/* 🖼 Image */}
        <img
          src={img.largeImageURL || img.webformatURL}
          className="w-full max-h-[75vh] object-contain rounded-lg shadow-xl"
        />

        {/* 📊 Info Bar */}
        <div className="flex items-center justify-between mt-5 text-white">

          {/* 👤 User */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center font-bold text-lg">
              {img.user.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-bold">{img.user}</p>
              <p className="text-sm text-gray-400">Photographer</p>
            </div>
          </div>

          {/* ❤️ 👀 ⬇ */}
          <div className="flex items-center gap-6 text-sm">

            {/* LIKE */}
            <button
              onClick={() => toggleFavorite(img)}
              className="flex items-center gap-1"
            >
              <Heart
                size={18}
                fill={liked ? "currentColor" : "none"}
                className={liked ? "text-red-500" : "text-white"}
              />
              {img.likes}
            </button>

            {/* VIEWS */}
            <span className="flex items-center gap-1">
              <Eye size={18} />
              {img.views}
            </span>

            {/* DOWNLOAD */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-700 px-5 py-2 rounded-md hover:opacity-90 transition"
            >
              <Download size={18} />
              Download
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
