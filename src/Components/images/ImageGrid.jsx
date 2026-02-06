import React from "react";
import ImageCard from "./ImageCard";

const ImageGrid = ({ images, toggleFavorite, isFavorite }) => {

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {images.map((img) => (
        <ImageCard
          key={img.id}
          img={img}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite ? isFavorite(img.id) : false}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
