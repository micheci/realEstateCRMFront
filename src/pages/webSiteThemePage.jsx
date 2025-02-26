import { useState } from "react";

const WebSiteThemePage = () => {
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: "#ff0000", // Default red
    secondaryColor: "#000000", // Default black
    font: "Arial",
    logo: "",
    backgroundType: "color",
    backgroundColor: "#ffffff",
    backgroundImage: "",
    buttonStyle: "rounded",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThemeSettings({ ...themeSettings, [name]: value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThemeSettings({ ...themeSettings, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Send themeSettings to backend for storage
    console.log("Saved Settings:", themeSettings);
    alert("Settings saved!");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Customize Your Website</h1>

      {/* Primary & Secondary Colors */}
      <div className="mb-4">
        <label className="block font-medium">Primary Color</label>
        <input
          type="color"
          name="primaryColor"
          value={themeSettings.primaryColor}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="block font-medium">Secondary Color</label>
        <input
          type="color"
          name="secondaryColor"
          value={themeSettings.secondaryColor}
          onChange={handleChange}
        />
      </div>

      {/* Font Selection */}
      <div className="mb-4">
        <label className="block font-medium">Font</label>
        <select
          name="font"
          value={themeSettings.font}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="Arial">Arial</option>
          <option value="Roboto">Roboto</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Georgia">Georgia</option>
        </select>
      </div>

      {/* Logo Upload */}
      <div className="mb-4">
        <label className="block font-medium">Upload Logo</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
        {themeSettings.logo && (
          <img
            src={themeSettings.logo}
            alt="Logo Preview"
            className="w-24 h-24 mt-2"
          />
        )}
      </div>

      {/* Background Selection */}
      <div className="mb-4">
        <label className="block font-medium">Background</label>
        <select
          name="backgroundType"
          value={themeSettings.backgroundType}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="color">Solid Color</option>
          <option value="image">Image Upload</option>
        </select>

        {themeSettings.backgroundType === "color" ? (
          <input
            type="color"
            name="backgroundColor"
            value={themeSettings.backgroundColor}
            onChange={handleChange}
          />
        ) : (
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleChange({
                target: {
                  name: "backgroundImage",
                  value: URL.createObjectURL(e.target.files[0]),
                },
              })
            }
          />
        )}
      </div>

      {/* Button Style */}
      <div className="mb-4">
        <label className="block font-medium">Button Style</label>
        <select
          name="buttonStyle"
          value={themeSettings.buttonStyle}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="rounded">Rounded</option>
          <option value="sharp">Sharp</option>
          <option value="outlined">Outlined</option>
        </select>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default WebSiteThemePage;
