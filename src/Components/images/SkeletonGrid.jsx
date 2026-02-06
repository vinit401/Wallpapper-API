import React from "react";

const SkeletonGrid = () => {
  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse bg-zinc-700 h-60 mb-4 rounded-lg"
        ></div>
      ))}
    </div>
  );
};

export default SkeletonGrid;
