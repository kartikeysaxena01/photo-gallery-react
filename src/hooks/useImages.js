import { useState, useEffect } from "react";

const useImages = () => {
  const [images, setImages] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchPhotos = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://picsum.photos/v2/list?limit=30");
        if (!res.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await res.json();
        setImages(data); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchPhotos();
  }, []); 

  return { images, loading, error };
};

export default useImages;