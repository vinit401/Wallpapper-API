import React from "react";
import ImageCard from "./ImageCard";

const ImageGrid = ({ images, toggleFavorite, isFavorite }) => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {images.map((img, index) => (
        <ImageCard
          key={img.id}
          img={img}
          index={index}
          images={images}   // 👉 FULL ARRAY
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
