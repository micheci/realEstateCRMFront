import React from "react";
import UploadImagesComponent from "../uploadImagesComponent";

interface MediaTabProps {
  images: any[];
  setImages: (val: any[]) => void;
}

const MediaTab: React.FC<MediaTabProps> = ({ images, setImages }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Images:</h3>
      <UploadImagesComponent images={images} setImages={setImages} />
    </div>
  );
};

export default MediaTab;
