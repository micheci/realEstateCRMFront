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
};

const agentData = {
  id: "789",
  name: "John Doe",
  email: "john@example.com",
  phone: "(123) 456-7890",
  image:
    "https://th.bing.com/th/id/OIP.F2zXcQvddzx5yuC0HNlohQHaHa?rs=1&pid=ImgDetMain",
};

const images = [
  "https://th.bing.com/th/id/OIP.HW9o-gKESImEapaUq7WbIgHaJQ?rs=1&pid=ImgDetMain",
  "https://th.bing.com/th/id/OIP.o0-_5Yz2Vr32GtIPXUKTLQHaEo?w=261&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  "https://static.house.com/house/images/mls/2024/05-20/641191fc40d548a9b734bfa98d7e6ed9.jpeg?x-oss-process=image/format,webp/resize,m_mfit,h_300,w_600",
  "https://static.house.com/house/images/mls/2024/05-20/7ad9852262f248dfb5ece4987281dd05.jpeg?x-oss-process=image/format,webp/resize,m_mfit,h_300,w_600",
  "https://static.house.com/house/images/mls/2024/05-20/25a70e0bb108424098992870a85c83a6.jpeg?x-oss-process=image/format,webp/resize,m_mfit,h_300,w_600",
  "https://static.house.com/house/images/mls/2024/05-20/737254f8816c4b2183d73c137050f1aa.jpeg?x-oss-process=image/format,webp/resize,m_mfit,h_300,w_600",
  "https://static.house.com/house/images/mls/2024/05-20/7e1884619ef04984b36cc5c004ecf88c.jpeg?x-oss-process=image/format,webp/resize,m_mfit,h_300,w_600",
  "https://static.house.com/house/images/mls/2024/05-20/3f5a631f3dc04021852cf5c641c1d69f.jpeg?x-oss-process=image/format,webp/resize,m_mfit,h_300,w_600",
  "https://static.house.com/house/images/mls/2024/05-20/0807cb9116dc4d2da07ff14011092aed.jpeg?x-oss-process=image/format,webp/resize,m_mfit,h_300,w_600",
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
