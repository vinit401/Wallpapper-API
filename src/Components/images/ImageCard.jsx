import React from "react";
import { Download, Heart, Eye, View } from "lucide-react";

const ImageCard = ({ img, onToggleFavorite, isFavorite }) => {
  return (
    <>
      <div className="group relative break-inside-auto mb-4 cursor-pointer ">
        <div className="relative overflow-hidden rounded-lg bg-zinc-800">
          <img
            src={img.webformatURL}
            className="w-full h-auto group-hover:scale-110 transition-transform duration-700 ease-in-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 tp-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-700 to-purple-700 flex items-center justify-center text-white text-sm font-extrabold">
                    {img.user.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white text-sm font-bold">
                    {img.user}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-white text-xs">
                  <span className="flex items-center gap-1">
                    <Heart
                      size={15}
                      fill="currentColor"
                      className="text-red-400"
                    />
                    {img.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye size={17} className="text-black-200 fontweight-bold" />
                    {img.views}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <button>
            <Download
              size={35}
              className="absolute top-2 right-2 bg-black/60 backdrop-blur text-white p-2 rounded-md  opacity-0 group-hover:opacity-100 transition hover:bg-black/50 cursor-pointer"
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(img);
            }}
            className="absolute top-2 left-2 bg-black/50 bacdrop-blur text-white p-2 rounded-md hover:bg-black/30 transition opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <Heart
              size={20}
              fill={isFavorite ? "currentColor" : "none"}
              stroke="white"
              className={isFavorite ? "text-red-500" : "text-white"}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default ImageCard;
