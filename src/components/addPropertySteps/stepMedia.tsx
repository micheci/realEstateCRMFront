import React, { useRef, useState, useEffect } from "react";
import { Property } from "../../../interfaces/IProperty";

type StepMediaProps = {
  data: Partial<Property>;
  setData: (data: Partial<Property>) => void;
};

const StepMedia: React.FC<StepMediaProps> = ({ data, setData }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Local state for preview URLs (do not send these to backend)
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // Generate preview URLs from files
  useEffect(() => {
    if (!data.images || data.images.length === 0) {
      setPreviewUrls([]);
      return;
    }

    const urls = (data.images as File[]).map((file) =>
      URL.createObjectURL(file)
    );
    setPreviewUrls(urls);

    // Revoke URLs on cleanup to avoid memory leaks
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [data.images]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Append new files to existing ones
    const newFiles = Array.from(files);

    setData({
      ...data,
      images: [...((data.images as File[]) || []), ...newFiles],
    });
  };

  const removeImage = (index: number) => {
    const updatedImages = (data.images as File[]).filter((_, i) => i !== index);
    setData({ ...data, images: updatedImages });
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        type="button"
      >
        Upload Images
      </button>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="grid grid-cols-3 gap-4 mt-4">
        {previewUrls.map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Uploaded ${index}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs hover:bg-red-600"
              type="button"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepMedia;
