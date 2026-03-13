import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function ImageCard({ imageUrl, author, isFav, toggleFav }) {

  return (
    <div className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden">

      <img
        src={imageUrl}
        alt={author}
        className="w-full h-48 object-cover"
      />

      <div className="flex justify-between items-center p-3">

        <p className="text-sm font-medium">
          {author}
        </p>

        <button onClick={toggleFav} className="text-xl">

          {isFav ? (
            <FaHeart className="text-red-500" />
          ) : (
            <FaRegHeart className="text-gray-400" />
          )}

        </button>

      </div>

    </div>
  );
}

export default ImageCard;