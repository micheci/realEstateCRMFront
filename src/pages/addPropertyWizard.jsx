import { useState } from "react";
import StepBasics from "../components/addPropertySteps/stepBasics";
import StepAmenities from "../components/addPropertySteps/stepAmenities";
import StepMedia from "../components/addPropertySteps/stepMedia";
import StepDescription from "../components/addPropertySteps/stepDescription";
import StepReview from "../components/addPropertySteps/stepReview";
import usePropertyStore from "../store/propertyStore";
import { useNavigate } from "react-router-dom";

const AddPropertyWizardForm = () => {
  const { createProperty } = usePropertyStore();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(true); // for validation
  const [propertyData, setPropertyData] = useState({
    title: "",
    address: "",
    description: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    images: [],
    garage: false,
    parkingSpaces: "",
    swimmingPool: false,
    fireplace: false,
    basement: false,
    finishedBasement: false,
    attic: false,
    airConditioning: false,
    remodeled: false,
    outdoorSpace: false,
    securitySystem: false,
    smartHome: false,
    fence: false,
    hoaFees: "",
    petsAllowed: false,
    walkInClosets: false,
    isFeatured: false,
    agentName: "",
    agentPhone: "",
    agentEmail: "",
  });

  const handleSubmit = async () => {
    const formData = new FormData();

    for (const key in propertyData) {
      if (key === "images") {
        propertyData.images.forEach((file) => {
          formData.append("images", file);
        });
      } else {
        formData.append(key, propertyData[key]);
      }
    }

    try {
      const response = await createProperty(formData);
      console.log(response, "res in front end");

      if (response.success) {
        // Navigate to the newly created property's detail page using its _id
        navigate(`/properties/${response.data._id}`);
      } else {
        // handle error or show message
        console.error("Property creation failed", response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const steps = [
    {
      title: "Basics",
      component: (
        <StepBasics
          key="step-basics"
          data={propertyData}
          setData={setPropertyData}
        />
      ),
    },
    {
      title: "Amenities",
      component: (
        <StepAmenities
          key="step-amenities"
          data={propertyData}
          setData={setPropertyData}
        />
      ),
    },
    {
      title: "Media",
      component: (
        <StepMedia
          key="step-media"
          data={propertyData}
          setData={setPropertyData}
          setStepValid={setIsStepValid} // <-- only used here
        />
      ),
    },
    {
      title: "Description",
      component: (
        <StepDescription
          key="step-description"
          data={propertyData}
          setData={setPropertyData}
        />
      ),
    },
    {
      title: "Review",
      component: <StepReview key="step-review" data={propertyData} />,
    },
  ];

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* Step Indicator */}
      <div className="flex justify-between mb-6">
        {steps.map((s, i) => (
          <div
            key={s.title}
            className={`flex-1 text-center py-2 border-b-4 ${
              i === step
                ? "border-blue-600 font-bold text-blue-600"
                : "border-gray-200 text-gray-500"
            }`}
          >
            {i + 1}. {s.title}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div>{steps[step].component}</div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={back}
          disabled={step === 0}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            onClick={next}
            disabled={step === 2 && !isStepValid}
            className={`px-4 py-2 rounded text-white ${
              step === 2 && !isStepValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddPropertyWizardForm;
