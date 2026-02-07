import React from "react";

const SkeletonGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="h-56 sm:h-64 bg-zinc-700 animate-pulse rounded-lg"
        />
      ))}
    </div>
  );
};

export default SkeletonGrid;
