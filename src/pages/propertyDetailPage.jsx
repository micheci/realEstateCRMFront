// import { useParams } from "react-router-dom";
import PropertyImageComponent from "../components/propertyImageComponent";
import PropertyInfoComponent from "../components/propertyInfoComponent";
import AgentInfoComponent from "../components/agentInfoComponent";

const propertyData = {
  id: "123",
  price: "$450,000",
  address: "123 Main St, Dallas, TX",
  bedrooms: 3,
  bathrooms: 2,
  sqft: "1,800 sqft",
  description:
    "A beautiful family home located in a quiet neighborhood. Features a spacious backyard and modern kitchen.",
  images: [
    "https://th.bing.com/th/id/OIP.HW9o-gKESImEapaUq7WbIgHaJQ?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/OIP.o0-_5Yz2Vr32GtIPXUKTLQHaEo?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://via.placeholder.com/150",
  ],
  agentId: "789", // Reference to the agent
  features: {
    garage: true,
    parkingSpaces: 2,
    swimmingPool: false,
    fireplace: true,
    basement: true,
    finishedBasement: false,
    attic: true,
    airConditioning: true,
    remodeled: false,
    securitySystem: true,
    smartHome: false,
    fence: true,
    hoaFees: 250,
    petsAllowed: true,
    walkInClosets: true,
  },
};

const agentData = {
  id: "789",
  name: "John Doe",
  email: "john@example.com",
  phone: "(123) 456-7890",
  image: "https://via.placeholder.com/100",
};

const images = [
  "https://th.bing.com/th/id/OIP.HW9o-gKESImEapaUq7WbIgHaJQ?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.o0-_5Yz2Vr32GtIPXUKTLQHaEo?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
];

const PropertyDetailPage = () => {
  // const { propertyId } = useParams();

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {/* Property Images */}
      <PropertyImageComponent images={images} />

      {/* Property Details & Agent Info */}
      <div className="flex flex-col lg:flex-row gap-4 mt-6">
        <PropertyInfoComponent property={propertyData} />
        <AgentInfoComponent agentData={agentData} />
      </div>
    </div>
  );
};

export default PropertyDetailPage;
