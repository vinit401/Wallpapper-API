import React from "react";
import ImageCard from "./ImageCard";

const ImageGrid = ({ images, toggleFavorite, isFavorite }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {images.map((img, index) => (
        <ImageCard
          key={img.id}
          img={img}
          index={index}
          images={images}
          onToggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
