import usePropertyStore from "../store/propertyStore";

const PropertiesPage = () => {
  const { properties, loading, error } = usePropertyStore(); // Use the store hook
  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Your Properties</h2>
      <p>Here you can manage all your listed properties.</p>

      <div className="mt-4 space-y-4">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property._id}
              className="bg-white p-4 shadow rounded-lg flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{property.title}</h3>
                <p>
                  <span className="font-medium">Price:</span> ${property.price}
                </p>
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {property.description}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {property.address.city}, {property.address.state}{" "}
                  {property.address.zip}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <img
                  src={property.images[0]}
                  alt={property.title}
                  className="h-32 w-32 object-cover rounded-lg shadow-md"
                />
              </div>
              <button className="mt-2 text-blue-500 hover:underline">
                Edit
              </button>
            </div>
          ))
        ) : (
          <div>No properties found.</div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
