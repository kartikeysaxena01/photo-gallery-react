import React, { useState, useReducer, useEffect,useMemo,useCallback} from "react";
import SearchBar from "../components/SearchBar";
import ImageCard from "../components/ImageCard";
import useImages from "../hooks/useImages";
import { favoriteReducer } from "../reducer/favouriteReducer";

function Gallery() {
  const { images, loading, error } = useImages();
  const [search, setSearch] = useState("");

  const storedFav = JSON.parse(localStorage.getItem("favorites")) || [];
  const [favorites, dispatch] = useReducer(favoriteReducer, storedFav);

  const [showSpinner, setShowSpinner] = useState(true); 

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 1000); 
    return () => clearTimeout(timer);
  }, []);
  const handleSearchChange = useCallback((value) => {
    setSearch(value);
  }, []);
  const filteredImages = useMemo(() => {
    return images.filter((img) =>
      img.author.toLowerCase().includes(search.toLowerCase())
    );
  }, [images, search]);
  if (loading || showSpinner) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg font-medium text-gray-700">Loading photos...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">PHOTO GALLERY</h1>
      <SearchBar setSearch={setSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredImages.map((img) => (
          <ImageCard
            key={img.id}
            imageUrl={img.download_url}
            author={img.author}
            isFav={favorites.includes(img.id)}
            toggleFav={() =>
              dispatch({ type: "TOGGLE_FAVORITE", payload: img.id })
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
