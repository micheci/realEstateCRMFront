import React, { useEffect, useState } from "react";
import { Property } from "../../../interfaces/IProperty";

interface StepReviewProps {
  data: Partial<Property>;
}

const StepReview: React.FC<StepReviewProps> = ({ data }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (!data.images || data.images.length === 0) {
      setPreviewUrls([]);
      return;
    }

    // Generate preview URLs for images, handling both File objects and string URLs
    const urls = (data.images as (File | string)[]).map((img) =>
      typeof img === "string" ? img : URL.createObjectURL(img)
    );
    setPreviewUrls(urls);

    // Cleanup blob URLs when component unmounts or data.images changes
    return () => {
      urls.forEach((url) => {
        if (!url.startsWith("http")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [data.images]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Review Your Property</h3>

      <div className="space-y-2">
        <div>
          <strong>Title:</strong> {data.title}
        </div>
        <div>
          <strong>Address:</strong> {data.address}
        </div>
        <div>
          <strong>Price:</strong> ${data.price}
        </div>
        <div>
          <strong>Bedrooms:</strong> {data.bedrooms}
        </div>
        <div>
          <strong>Bathrooms:</strong> {data.bathrooms}
        </div>
        <div>
          <strong>Square Footage:</strong> {data.sqft}
        </div>
        <div>
          <strong>Property Type:</strong> {data.type}
        </div>
        <div>
          <strong>Status:</strong> {data.status}
        </div>
      </div>

      <div className="space-y-2">
        <strong>Amenities:</strong>
        <ul className="list-disc list-inside ml-4">
          {[
            "garage",
            "swimmingPool",
            "fireplace",
            "basement",
            "finishedBasement",
            "attic",
            "airConditioning",
            "remodeled",
            "outdoorSpace",
            "securitySystem",
            "smartHome",
            "fence",
            "petsAllowed",
            "walkInClosets",
            "isFeatured",
          ]
            .filter((key) => data[key as keyof Property])
            .map((key) => (
              <li key={key}>
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (c) => c.toUpperCase())}
              </li>
            ))}
        </ul>
        <div>
          <strong>Parking Spaces:</strong> {data.parkingSpaces}
        </div>
        <div>
          <strong>HOA Fees:</strong> {data.hoaFees}
        </div>
      </div>

      <div>
        <strong>Description:</strong>
        <p className="whitespace-pre-wrap text-gray-700">{data.description}</p>
      </div>

      <div>
        <strong>Images:</strong>
        <div className="flex gap-2 flex-wrap">
          {previewUrls.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Image ${idx}`}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepReview;
