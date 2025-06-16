import { useEffect } from "react";
import { useParams } from "react-router-dom";
import PropertyInfoComponent from "../components/propertyInfoComponent";
import AgentInfoComponent from "../components/agentInfoComponent";
import usePropertyStore from "../store/propertyStore";
import useProfileStore from "../store/profileStore";
import PropertyImageComponent from "../components/propertyImageComponent";
import Navbar from "../components/navbar";

const PropertyDetailPage = () => {
  const { propertyId } = useParams();
  const { getPropertyById, property } = usePropertyStore();
  const { fetchProfile, profile } = useProfileStore();
  useEffect(() => {
    const fetchProperty = async () => {
      if (propertyId) {
        await getPropertyById(propertyId);
        await fetchProfile();
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (!property || !profile) return <div>Loading...</div>;

  return (
    <>
      <Navbar /> {/* ⬅️ Now it spans full width */}
      <div className="max-w-screen-xl mx-auto p-4">
        <PropertyImageComponent images={property.images} />

        <div className="flex flex-col lg:flex-row gap-4 mt-6">
          <PropertyInfoComponent property={property} />
          <AgentInfoComponent agentData={profile} />
        </div>
      </div>
    </>
  );
};

export default PropertyDetailPage;
