import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyImageComponent from "../components/propertyImageComponent";
import PropertyInfoComponent from "../components/propertyInfoComponent";
import AgentInfoComponent from "../components/agentInfoComponent";
import usePropertyStore from "../store/propertyStore";

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const { getPropertyById, property } = usePropertyStore();

  //const [property, setProperty] = useState(null);
  console.log(propertyId, property, "indetailpage");
  useEffect(() => {
    const fetchProperty = async () => {
      if (propertyId) {
        await getPropertyById(propertyId);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (!property) return <div>Loading...</div>;

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {/* Property Images */}
      <PropertyImageComponent images={property.images} />

      {/* Property Details & Agent Info */}
      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <PropertyInfoComponent property={property} />
        <AgentInfoComponent agentData={property.agent} />
      </div>
    </div>
  );
};

export default PropertyDetailPage;
