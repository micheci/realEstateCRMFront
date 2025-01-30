import usePropertyStore from "../store/propertyStore";
import PropertyCard from "../components/propertyCard"; // Importing PropertyCard

const PropertiesPage = () => {
  const { properties, loading, error } = usePropertyStore(); // Use the store hook

  if (loading) return <div>Loading properties...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Your Properties</h2>
      <p>Here you can manage all your listed properties.</p>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {properties.length > 0 ? (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        ) : (
          <div>No properties found.</div>
        )}
      </div>
    </div>
  );
};

export default PropertiesPage;
