import React from "react";
import { Property } from "../../../interfaces/IProperty";

type StepDescriptionProps = {
  data: Partial<Property>;
  setData: (data: Partial<Property>) => void;
};

const StepDescription: React.FC<StepDescriptionProps> = ({ data, setData }) => {
  return (
    <div className="space-y-4">
      <textarea
        placeholder="Property Description"
        value={data.description || ""}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        rows={8}
        className="w-full border rounded px-4 py-2"
      />
    </div>
  );
};

export default StepDescription;
