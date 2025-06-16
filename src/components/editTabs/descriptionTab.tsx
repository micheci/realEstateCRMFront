import React from "react";

interface DescriptionTabProps {
  editedProperty: any;
  setEditedProperty: (val: any) => void;
}

const DescriptionTab: React.FC<DescriptionTabProps> = ({
  editedProperty,
  setEditedProperty,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedProperty((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <label className="block mb-2">Description:</label>
      <textarea
        name="description"
        value={editedProperty.description || ""}
        onChange={handleChange}
        rows={6}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default DescriptionTab;
