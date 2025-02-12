import { useParams } from "react-router-dom";
import PropertyImageComponent from "../components/propertyImageComponent";

const images = [
  "https://th.bing.com/th/id/OIP.HW9o-gKESImEapaUq7WbIgHaJQ?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.o0-_5Yz2Vr32GtIPXUKTLQHaEo?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150", // More images...
];

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  return (
    <div>
      <h1>Property Detail Pages - Property ID: {propertyId}</h1>
      <PropertyImageComponent images={images} />
    </div>
  );
};

export default PropertyDetailPage;
