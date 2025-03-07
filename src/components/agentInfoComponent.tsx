import React from "react";

interface AgentData {
  id: string;
  name: string;
  email: string;
  phone: string;
  profilePicture: string;
}

const AgentInfoComponent = ({ agentData }: { agentData: AgentData }) => {
  console.log(agentData, "inagentcomponent");
  return (
    <div className="w-full lg:w-1/4 bg-gray-100 p-6 shadow-md rounded-lg self-start text-center">
      <img
        src={agentData.profilePicture}
        alt={agentData.name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h2 className="text-xl font-semibold mb-2">{agentData.name}</h2>
      <p>
        <strong>Email:</strong> {agentData.email}
      </p>
      <p>
        <strong>Phone:</strong> {agentData.phone}
      </p>
    </div>
  );
};

export default AgentInfoComponent;
