import { useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';

const usePreloadImages = (imageUrls: string[]) => {
  useEffect(() => {
    imageUrls.forEach(async (url) => {
      const cachedUrl = localStorage.getItem(url);

      if (cachedUrl) {
        // Image URL is already cached, no need to fetch it again
        const img = new Image();
        img.src = cachedUrl;
      } else {
        // Fetch the image URL from Firebase Storage
        if (url.startsWith('gs://')) {
          try {
            const storageRef = ref(storage, url);
            const downloadURL = await getDownloadURL(storageRef);

            // Cache the download URL in localStorage
            localStorage.setItem(url, downloadURL);

            const img = new Image();
            img.src = downloadURL;
          } catch (error) {
            console.error('Error loading image from Firebase Storage:', error);
          }
        } else {
          // Cache non-Firebase URLs directly
          localStorage.setItem(url, url);
          const img = new Image();
          img.src = url;
        }
      }
    });
  }, [imageUrls]);
};

export default usePreloadImages;