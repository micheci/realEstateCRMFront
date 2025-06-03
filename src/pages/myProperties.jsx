import PropertyCard from "../components/propertyCard";

const properties = [
  {
    _id: "1",
    title: "Modern Family Home",
    price: 450000,
    description: "A beautiful modern home perfect for families.",
    address: {
      city: "Austin",
      state: "TX",
      zip: "78701",
    },
    images: [
      "/images/house1.jpg",
      "/images/house2.jpg",
      "/images/house3.jpg",
      "/images/house4.jpg",
    ],
  },
  {
    _id: "2",
    title: "Downtown Apartment",
    price: 320000,
    description: "Stylish apartment in the heart of downtown.",
    address: {
      city: "Dallas",
      state: "TX",
      zip: "75201",
    },
    images: ["/images/apartment1.jpg", "/images/apartment2.jpg"],
  },
  {
    _id: "3",
    title: "Cozy Country Cottage",
    price: 275000,
    description: "Quiet retreat with spacious land and charm.",
    address: {
      city: "Waco",
      state: "TX",
      zip: "76706",
    },
    images: [
      "/images/cottage1.jpg",
      "/images/cottage2.jpg",
      "/images/cottage3.jpg",
      "/images/cottage4.jpg",
      "/images/cottage5.jpg",
    ],
  },
];

// const PropertyCard = ({ property }) => (
//   <div className="bg-white rounded-xl shadow-md overflow-hidden">
//     <img
//       src={property.image}
//       alt="Property"
//       className="w-full h-48 object-cover"
//     />
//     <div className="p-4">
//       <div className="text-lg font-semibold">{property.address}</div>
//       <div className="text-gray-600">{property.price}</div>
//       <div className="text-sm text-gray-500 mt-1">
//         🛏 {property.beds} · 🛁 {property.baths} · 📐 {property.sqft} sqft
//       </div>
//       <div className="flex justify-end space-x-2 mt-4">
//         <button className="text-blue-600 hover:underline">Edit</button>
//         <button className="text-red-600 hover:underline">Delete</button>
//         <button className="text-gray-600 hover:underline">View</button>
//       </div>
//     </div>
//   </div>
// );

export default function MyProperties() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full-width Header */}
      <div className="w-full bg-white border-b border-gray-200 shadow-sm py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6">
          <h1 className="text-2xl font-bold">My Properties</h1>

          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700">
              + Add Property
            </button>
            {/* Profile Button */}
            <button className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center hover:ring-2 hover:ring-blue-400">
              <img
                src="/images/profile.jpg" // Replace with your image path or avatar service
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by address..."
            className="border rounded px-3 py-2 w-full sm:w-64"
          />
          <select className="border rounded px-3 py-2">
            <option>Status</option>
            <option>Active</option>
            <option>Sold</option>
            <option>Draft</option>
          </select>
          <select className="border rounded px-3 py-2">
            <option>Property Type</option>
            <option>House</option>
            <option>Apartment</option>
          </select>
          <input
            type="number"
            placeholder="Max Price"
            className="border rounded px-3 py-2 w-full sm:w-32"
          />
        </div>

        {/* Property Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
}
